import AWS from "aws-sdk";

const awsConfig = {
    accessKeyId: process.env.RNAWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.RNAWS_SECRET_ACCESS_KEY,
    region: process.env.RNAWS_REGION,
    apiVersion: process.env.RNAWS_API_VERSION,
   };
    
 export const s3 = new AWS.S3(awsConfig);
  