
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

 