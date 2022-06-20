import User from "@/models/userModel";
import connectDb from "@/utils/db";
import Post from "models/postModel";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ message: `Nothing to ${method}` });
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
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
    case "PATCH":
      try {
        console.log("reached");

        const { values } = req.body;

        const user = await User.findByIdAndUpdate(req.query.userId, values, {new: true});
        res.status(200).json({ success: true, user });
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
