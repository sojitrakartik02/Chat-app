import mongoose from "mongoose";
import "dotenv/config";

const mongo = async () => {
  try {
    console.log("process.env.MONGO_DB", process.env.MONGO_DB);
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected Mongo");
  } catch (err) {
    console.log("Error in MongoDB", err.message);
  }
};

export default mongo;
