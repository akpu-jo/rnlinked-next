import User from "@/models/userModel";
import { checkIfUsernameExists } from "@/utils/checkIfUsernameExists";
import connectDb from "@/utils/db";

export default async function handler(req, res) {
  const { method } = req;
  const { sessionUserId } = req.body;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const { username } = req.query;
        const user = await User.findOne({ username })
          .select("_id name username image followers")
          .populate("followers", "_id username name image");
        res.status(200).json({ success: true, user });
      } catch (error) {
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
