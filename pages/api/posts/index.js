import Post from "../../../models/postModel";
import User from "@/models/userModel";
import connectDb from "../../../utils/db";
  
export default async function handler(req, res) {
  const { method } = req;
  const { userId } = req.query;

  await connectDb();
  console.log('reached /api/posts:16==================================================> 🤡')

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find(userId ? { userId } : {replyTo: null}) //
          .populate("userId", "name username image ")
          .populate({
            path: "replyTo", 
            select: '_id',
            populate: { path: "userId", select: "name username" },
          })
          .sort({ createdAt: -1 }); /* find all the data in our database */
        res.status(200).json({ success: true, posts });
      } catch (error) {
        console.log('get posts error:/api/posts/24 ===>', error)
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { body, userId, image, replyTo } = req.body;

      try {
        let data;
        replyTo === undefined
          ? (data = {
              body,
              userId,
              image,
            })
          : (data = {
              body,
              userId,
              image,
              replyTo,
              isReply: true,
            });

        const post = await Post.create(data);
        
        if (replyTo !== undefined) {
          await Post.findByIdAndUpdate(
            replyTo,
            { $push: { replies: post._id } },
            { new: true }
          );
        }
        res.status(201).json({ success: true, post });
      } catch (error) {
        console.log("Create Post Error===>", error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
