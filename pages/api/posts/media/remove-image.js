import { s3 } from "@/utils/aws";

export default async function removeImage(req, res) {
  const { method } = req
  const { image } = req.body;
  
  switch (method) {
    // case 'GET': 
    //   break
    case 'POST':
        try {
            // image params
            console.log("Imageee", s3)
            const params = {
              Bucket: image.Bucket,
              Key: image.Key,
            };
          
            // send remove request to s3
            s3.deleteObject(params, (err, data) => {
              if (err) {
                console.log('errrrr===>',err);
                res.status(400).send(err);
              }
              res.send({ ok: true });
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