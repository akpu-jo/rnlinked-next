import User from "@/models/userModel";
import connectDb from "@/utils/db";
import { authenticate } from "@/utils/auth";

export default async function handler(req, res) {
  // const { token } = req.headers;
  // console.log(token)

  const sessionUser = await authenticate(req, res)
  
    const { method } = req;
  
    await connectDb();


  switch (method) { 
    case "GET":
      try {
        const users = await User.find({_id: {$ne: sessionUser._id}})
          .select( "followers following name username image _id ")
          .limit(6); /* find all the data in our database */
          //   .sort("-createdAt")
        res.status(200).json({ success: true, users });
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