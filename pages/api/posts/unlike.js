import connectDb from "@/utils/db";
import Post from "models/postModel";



export default async function handler(req, res) {
  const { method } = req
  const { postId, userId } = req.body;

  await connectDb()

  switch (method) {
    case 'GET':
      try {
        const post = await Pet.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        await Post.findByIdAndUpdate(postId, {
          $pull: { likes: userId },
        }).exec();
  
        res.status(200).json({ ok: true });
      } catch (error) {
        res.status(400).json({ error });
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}