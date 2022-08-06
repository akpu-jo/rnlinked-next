import { s3 } from "@/utils/aws";
import connectDb from "@/utils/db";
import Comment from "models/commentModel";
import Post from "models/postModel";
import Article from "models/articleModel";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  const { method } = req;
  
  await connectDb();
  
  switch (method) {
    case "GET":
      try {
        const { postId, articleId } = req.query;
        const commentOrigin = articleId ? {articleId} : {postId};

        const comments = await Comment.find( commentOrigin )
          .populate("userId", "name username image")
          .sort({ updatedAt: "-1" });
        res.status(200).json({ success: true, comments });
      } catch (error) {
        console.log("LoadComments err===>", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { postId, articleId, isArticle } = req.body;

      console.log(postId, req.body);

      const model = isArticle ? Article : Post;
      const commentOrigin = isArticle ? articleId : postId;

      try {
        const comment = await Comment.create(req.body);

        await comment.populate("userId", "name username image _id");

        //update parent post
        // if(isArticle){
          
        // }
        await model.findByIdAndUpdate(
          commentOrigin,
          { $push: { comments: comment._id } },
          { new: true }
        );

        console.log(comment);
        res.status(201).json({ success: true, comment });
      } catch (error) {
        console.log("Create Comment Error===>", error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
