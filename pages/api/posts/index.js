import { s3 } from "@/utils/aws";
import { nanoid } from "nanoid";
import Post from "../../../models/postModel";
import User from "../../../models/userModel";
import connectDb from "../../../utils/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({}).populate(
          "userId"
        ); /* find all the data in our database */
        res.status(200).json({ success: true, posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      //Uri is the raw/resized image file
      const { body, userId, uri } = req.body;

      try {
        //Prepare Image
        if (uri) {
          const base64Data = new Buffer.from(
            uri.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );

          const type = uri.split(";")[0].split("/")[1];
          // image params
          const params = {
            Bucket: "rnlinkedbucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
          };

          // upload to s3
          s3.upload(params, async (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
            // res.send(data);
            const post = await Post.create({ body, userId, image: data });
            res.status(201).json({ success: true, post });
          });
        } else{
          const post = await Post.create({ body, userId });
          res.status(201).json({ success: true, post });
        }
      } catch (error) {
        console.log("Create Post Error===>", error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
