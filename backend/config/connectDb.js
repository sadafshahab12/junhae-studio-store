import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const connect = await mongoose.connect(mongoUri);
    console.log(`Mongodb connected successfully: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Mongodb connection failed: ${error.message}`);
  }
};
