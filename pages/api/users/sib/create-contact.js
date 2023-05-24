import User from "@/models/userModel";
import connectDb from "@/utils/db";
import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req, res) {
  const { method } = req;
  const { sessionUserId } = req.body;

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
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      //configure API key auth: api-key
      const apiKey = defaultClient.authentications["api-key"];

      apiKey.apiKey = process.env.SIB_API_KEY;
      console.log("API KEY /api/users/sib/create-contact:41", process.env.SIB_API_KEY);

      const partnerKey = defaultClient.authentications["partner-key"];
      partnerKey.apiKey = process.env.SIB_API_KEY;

      let api = new SibApiV3Sdk.ContactsApi();
      const newContact = new SibApiV3Sdk.CreateContact();

      let addedToSib;

      try {
        const { filter } = req.body;
        console.log("reqBody /api/users/sib/create-contact:41", req.body);
        const user = await User.findOne(filter);
        if (user.inEmailList) {
          newContact.email = user.email;
          newContact.attributes = {
            FIRSTNAME: user.name.split(" ")[0],
            LASTNAME: user.name.split(" ")[1],
          };

          newContact.listIds = [4, 6];

          console.log(
            "createContact /api/users/sib/createContact:51",
            newContact
          );

          //call SIB api
          api.createContact(newContact).then(
            (data) => {
              addedToSib = true;
              console.log("datalog /api/users/sib/createContact:56", data);
            },
            (error) => {
              // if (error.body.code === "duplicate_parameter") {
              //   addedToSib = "Contact already exist.";
              // }
              console.log("errorlog /api/users/sib/createContact:58", error);
            }
          );
        }
        res.status(200).json({ success: true, addedToSib });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
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
