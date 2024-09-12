import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
  }
};
export default connectDB;
