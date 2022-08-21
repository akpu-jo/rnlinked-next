import Article from "@/models/articleModel";
import Post from "../../../models/postModel";
import connectDb from "../../../utils/db";

export default async function handler(req, res) {
  const { method } = req;
  const { userId } = req.query;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const articles = await Article.find(userId ? { userId } : {})
          .populate("author", "name username image ")
          .sort({ createdAt: -1 }); /* find all the data in our database */
        res.status(200).json({ success: true, articles });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { title, body, author, image } = req.body;

      try {
        console.log(req.body, '<==reqbody api');

        const article = await Article.create({ title, body, author, image });

        // await article.populate("author", "name username image");

        res.status(201).json({ success: true, article });
      } catch (error) {
        console.log("Create article Error===>", error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
