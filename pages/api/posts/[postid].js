import User from '../../../models/userModel'
import connectDb from '../../../utils/db'
import { hashPassword } from '../../../utils/hashPassword'

export default async function handler(req, res) {
  const { method } = req
  const {email, password} = req.body

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
          const hashedPassword = await hashPassword(password)
        const user = await User.create(
          {email, password: hashedPassword}
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}