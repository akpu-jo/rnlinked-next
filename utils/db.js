import mongoose from "mongoose";

const mongoUrl = process.env.DB_URL


if (!mongoUrl) {
  throw new Error(
    'Please define the DB_URL environment variable inside .env.local'
  )
}

let cached = global.mongoose

console.log(cached)

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

  console.log(cached.conn)
  return cached.conn

};


export default connectDb