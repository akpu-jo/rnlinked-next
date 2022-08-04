import Article from "@/models/articleModel";
import connectDb from "@/utils/db";
import Post from "models/postModel";



export default async function handler(req, res) {
  const { method } = req
  const { articleId, userId } = req.body;

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
        let article;
        article = await Article.findById(articleId)
        const isliked = article.likes && article.likes.includes(userId)

        console.log("isLiked===>", isliked)

        const options = isliked ? "$pull" : "$addToSet"
        article = await Article.findByIdAndUpdate(articleId, {
          [options]: { likes: userId },
        }, {new: true});
  
        res.status(200).json({ likes: article.likes, isliked });
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