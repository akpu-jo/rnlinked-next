
import axios from "axios";
import Resizer from "react-image-file-resizer";

export const serialize = () => {
    return 
  };

 export const resizeImage = (file) => {
    //Resize
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          // console.log("uri===>", uri);
          resolve(uri);
        },
        "base64"
      );
    });
  };

 export const deleteCloudinaryImage = async (publicId) => {
   try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_NODE_API}/articles/remove-image`,
      { publicId }
    );
    return data.result
   } catch (error) {
     console.log(error)
   }

 }