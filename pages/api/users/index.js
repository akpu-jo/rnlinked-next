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
        const { email } = req.query;
        const user = await User.findOne(
          { email }
        ); 
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { name, email, uid, image } = req.body;

      let username;

      //extract email username
      const emailUsername = email.split("@")[0].replace(".", "-");
      // console.log("username===>", emailUsername);
      //check if username exists
      const userNameExists = await checkIfUsernameExists(emailUsername);
      //generate username
      if (!userNameExists) {
        username = emailUsername;
      } else {
        username = emailUsername + crypto.randomBytes(2).toString("hex");
      }

      try {
        let user = await User.create({ name, email, uid, username, image });

        res.status(201).json({ success: true, user });
      } catch (error) {
        console.log("createUseer====>", error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
