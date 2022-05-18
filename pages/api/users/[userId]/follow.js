import User from "@/models/userModel";
import connectDb from "@/utils/db";
import Post from "models/postModel";



export default async function handler(req, res) {
  const { method } = req
  const { sessionUserId } = req.body;
  const {userId} = req.query


  await connectDb()

  switch (method) {
    case 'GET':
      try {
        const post = await Pet.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        let user;
        user = await User.findById(userId)

        if(!user) return res.sendStatus(404);

        const isFollowing = user.followers && user.followers.includes(sessionUserId)

        console.log("isFollowing===>", isFollowing)

        const options = isFollowing ? "$pull" : "$addToSet"
        user = await User.findByIdAndUpdate(userId, {
          [options]: { followers: sessionUserId },
        }, {new: true});
        await User.findByIdAndUpdate(sessionUserId, {
          [options]: {following: userId}
        })
  
        res.status(200).json({ followers: user.followers, isFollowing });
      } catch (error) {
        console.log("Like Err0r====>", error)      
        res.status(400).json({ error });
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}