import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoCn = async () => {
  const MONGOD_URI = process.env.MONGOD_URI;
  try {
    await mongoose.connect(MONGOD_URI).then(() => {
      console.log("Success to connect to mongodb server");
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

export default mongoCn;
