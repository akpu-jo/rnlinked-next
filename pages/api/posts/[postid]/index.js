import Post from "@/models/postModel";
import connectDb from "@/utils/db";

export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const { postid } = req.query;
        let replies = [];
        const post = await Post.findById(postid)
          .populate("userId", "name username image")
          .populate({
            path: "replyTo",
            populate: { path: "userId", select: "name username image" },
          });

        console.log("post api ====>", post);

        if (post === null) {
          res.status(200).json({ success: false });
        }
        if (post !== null) {
          replies = await Post.find({ replyTo: postid })
            .populate("userId", "name username image")
            .populate({
              path: "replyTo",
              select: "_id",
              populate: { path: "userId", select: "name username" },
            });
        }

        res.status(200).json({ success: true, post, replies });
      } catch (error) {
        console.log("post error ===> ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        res.status(200).json({ message: `Nothing to ${method}` });
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
      }
      break;

    case "DELETE":
      const { postid, replyTo } = req.query;

      try {
        await Post.findByIdAndDelete(postid);
        if (replyTo !== null) {
          await Post.findByIdAndUpdate(replyTo, {
            $pull: { replies: postid },
          });
        }
        res.status(202).json({ success: true });
      } catch (error) {
        console.log("Deleting post error====>", error);
        res
          .status(400)
          .json({ success: false, message: "Unable to delete post", error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
