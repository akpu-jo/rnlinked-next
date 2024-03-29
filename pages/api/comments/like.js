import Comment from "@/models/commentModel";
import connectDb from "@/utils/db";


export default async function handler(req, res) {
  const { method } = req
  const { commentId, userId } = req.body;

  await connectDb()

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ message: `Nothing to ${method}` });
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
      }
      break
    case 'POST':
      try {
        let comment;
        comment = await Comment.findById(commentId)
        const isliked = comment.likes && comment.likes.includes(userId)

        console.log("isLiked===>", isliked)

        const options = isliked ? "$pull" : "$addToSet"
        comment = await Comment.findByIdAndUpdate(commentId, {
          [options]: { likes: userId },
        }, {new: true});
  
        res.status(200).json({ likes: comment.likes, isliked });
      } catch (error) {
        console.log("Like Err0r====>", error)      
        res.status(400).json({ error });
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}