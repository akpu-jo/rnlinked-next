import User from "@/models/userModel";
import connectDb from "@/utils/db";
import Post from "models/postModel";

export default async function handler(req, res) {
  const { method } = req;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const query = req.query.q;
        console.log(query);

        // const { search } = req.query;
        if (query !== undefined) {
          const result = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
              ],
          })
            .select("_id name username image bio followers");
          res.status(200).json({
            success: true,
            result,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let post;
        post = await Post.findById(postId);
        const isliked = post.likes && post.likes.includes(userId);

        console.log("isLiked===>", isliked);

        const options = isliked ? "$pull" : "$addToSet";
        post = await Post.findByIdAndUpdate(
          postId,
          {
            [options]: { likes: userId },
          },
          { new: true }
        );

        res.status(200).json({ likes: post.likes, isliked });
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}