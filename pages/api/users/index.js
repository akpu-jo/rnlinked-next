import User from "@/models/userModel";
import { checkIfUsernameExists } from "@/utils/checkIfUsernameExists";
import connectDb from "@/utils/db";
import SibApiV3Sdk from "sib-api-v3-sdk";
import { customAlphabet } from 'nanoid'

export default async function handler(req, res) {
  const { method } = req;
  const { sessionUserId } = req.body;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { name, email, uid, image, signinMethod, emailVerified } = req.body;
      console.log(req.body);

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
        const nanoid = customAlphabet("1234567890abcdef", 10);
        // model.id = nanoid(5); //=> "f01a2"
        username = emailUsername + nanoid(5);
      }

      try {
        let user = await User.create({
          name,
          email,
          uid,
          username,
          image,
          signinMethod,
          emailVerified,
        });
        res.status(201).json({ success: true, user });
      } catch (error) {
        console.log("createUseer====>", error);
        res.status(400).json({ error });
      }
      break;
    case "PATCH":
      // const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // //configure API key auth: api-key
      // const apiKey = defaultClient.authentications["api-key"];

      // apiKey.apiKey =
      //   "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";

      // const partnerKey = defaultClient.authentications["partner-key"];
      // partnerKey.apiKey =
      //   "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";

      // let api = new SibApiV3Sdk.ContactsApi();
      // const newContact = new SibApiV3Sdk.CreateContact()

      // let addedToSib;

      try {
        const { filter, reqBody } = req.body;
        console.log("reqBody /api/users :76", req.body);

        const user = await User.findOneAndUpdate(filter, reqBody, {
          new: true,
        });
        // if(inEmailList){
        //   newContact.email = user.email
        //   newContact.attributes = {
        //     FIRSTNAME: user.name.split(' ')[0],
        //     LASTNAME: user.name.split(' ')[1],
        //   }
        //   // newContact.firstname = user.name.split(' ')[0]
        //   // newContact.lastname = user.name.split(' ')[1]
        //   newContact.listIds = [4, 6]

        //   console.log('createContact /api/users:90', newContact)

        //   //call SIB api
        //   api.createContact(newContact).then((data)=> {
        //     addedToSib = true
        //     console.log('datalog /api/users:93', data)
        //   }, (error) => {
        //     console.log('errorlog /api/users:95', error)
        //   })
        // }
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
