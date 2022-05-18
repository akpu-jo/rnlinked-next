import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URI


// if (!mongoUrl) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(mongoUrl, opts).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise

  return cached.conn
  
};

export default connectDb