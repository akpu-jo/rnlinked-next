
import { s3 } from "@/utils/aws";
import connectDb from "@/utils/db";
import { nanoid } from "nanoid";

export default async function uploadImage(req, res) {
  const { method } = req
  const { image } = req.body;

  await connectDb()
  
  switch (method) {
    // case 'GET': 
    //   break
    case 'POST':
        try {
            if (!image) return res.status(400).send("No image");
          
            // prepare the image
            const base64Data = new Buffer.from(
              image.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            );
          
            const type = image.split(";")[0].split("/")[1];
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
            s3.upload(params, (err, data) => {
              if (err) {
                console.log(err);
                return res.status(400).send(err);
              }
              console.log(data);
              res.send(data);
            });
          } catch (err) {
            console.log(err);
          }
        
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
{
  role: 'user',
  posts: [],
  _id: new ObjectId("624580861d89c21a6fddd09e"),
  name: 'Joseph Akpu',
  email: 'akpu.jo@gmail.com',
  image: 'https://pbs.twimg.com/profile_images/1508879557985722369/N5Xs5FZd.jpg',
  emailVerified: null,
  updatedAt: 2022-04-03T00:23:49.524Z,
  username: 'akpu-jo'
}