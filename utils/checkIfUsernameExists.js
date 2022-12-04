import User from "../models/userModel.js";

export const checkIfUsernameExists = async (emailUsername) =>{
    const user = await User.findOne({ username: emailUsername });
    if(!user){
        return false
    }else{
        return true
    }
}