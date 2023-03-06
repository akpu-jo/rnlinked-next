import User from "@/models/userModel";
import admin from "firebaseConfig/fbs";

export const authenticate = async (req, res) => {
  const { token } = req.headers;

  let user;
  try {
    const firebaseUser = await admin.auth().verifyIdToken(token);
    user = await User.findOne({ uid: firebaseUser.uid });

    return user;
  } catch (error) {
    if (error.errorInfo.code === "auth/id-token-expired") {
      const errorData = {
        tokenExpired: true,
      }

      return errorData

      
    } else {
   
      console.log("token error==>", error.errorInfo.code);
    }
  }
};

// const handleTokenCookie = (context) => {
//   try {
//     const token = parseTokenFromCookie(context.req.headers.cookie)
//     await verifyToken(token)
//   } catch (err) {
//     if (err.name === 'TokenExpired') {
//       // If expired, user will be redirected to /refresh page, which will force a client-side
//       // token refresh, and then redirect user back to the desired page
//       const encodedPath = encodeURIComponent(context.req.url)
//       context.res.writeHead(302, {
//         // Note that encoding avoids URI problems, and `req.url` will also
//         // keep any query params intact
//         Location: `/refresh?redirect=${encodedPath}`
//       })
//       context.res.end()
//     } else {
//       // Other authorization errors...
//     }
//   }
// }
