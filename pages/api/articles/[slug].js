import Article from "@/models/articleModel";
import Post from "@/models/postModel";
import User from "../../../models/userModel";
import connectDb from "../../../utils/db";
import { hashPassword } from "../../../utils/hashPassword";

export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const { slug } = req.query;
        console.log("req.query", req.query);
        console.log("Slug ===> ", slug);
        const article = await Article.findOne({slug}).populate(
          "author",
          "name username image followers bio"
        );
        res.status(200).json({ success: true, article });
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
    default:
      res.status(400).json({ success: false });
      break;
  }
}
