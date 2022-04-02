
import connectDb from "../../utils/db"

connectDb()

export default function handleHello(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
