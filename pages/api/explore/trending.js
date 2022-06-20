import User from "@/models/userModel";
import connectDb from "@/utils/db";
import Post from "models/postModel";

export default async function handler(req, res) {
  const { method } = req;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({ image: { $ne: [{}] }, image: {$ne: []} })
          .populate("userId", "name username image ")
          .sort("createdAt: -1")
          .limit(6); /* find all the data in our database */
        res.status(200).json({ success: true, posts });
      } catch (error) {
        console.log(error);
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
    default:
      res.status(400).json({ success: false });
      break;
  }
}
