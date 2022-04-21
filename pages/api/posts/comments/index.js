import { s3 } from "@/utils/aws";
import connectDb from "@/utils/db";
import Comment from "models/commentModel";
import Post from "models/postModel";
import { nanoid } from "nanoid";


export default async function handler(req, res) {
  const { method } = req;
  const {postId} = req.query;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        const comments = await Comment.find({postId}).populate(
          "userId",
          "name username image"
        );
        res.status(200).json({ success: true, comments });
      } catch (error) {
        console.log("LoadComments err===>", error)
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      //Uri is the raw/resized image file
      const { body, userId, postId, uri } = req.body;

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
            const comment = await Comment.create({
              body,
              userId,
              postId,
              image: data,
            });
            //update parent post
            await Post.findByIdAndUpdate(
              postId,
              { $push: { comments: comment._id } },
              { new: true }
            );
            res.status(201).json({ success: true, comment });
          });
        } else {
          const comment = await Comment.create({
            body,
            userId,
            postId,
          });
          //update parent post
          await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: comment._id } },
            { new: true }
          );
          res.status(201).json({ success: true, comment });
        }
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
