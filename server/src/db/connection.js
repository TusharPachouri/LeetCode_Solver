import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB name: ${connectionString.connection.name}`
    );
  } catch (error) {
    console.error(`Error while connecting to mongoDb : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
