import User from "@/models/userModel";
import admin from "firebaseConfig/fbs";

export const authenticate = async (token) => {
    let user;
    // console.log('Token from auth===>', token)
    // if(token){

    // }
    const firebaseUser = await admin.auth().verifyIdToken(token);
    user = await User.findOne({ uid: firebaseUser.uid });

  
  
    return user
  }