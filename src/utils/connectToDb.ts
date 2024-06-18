import config from "config";
import mongoose from "mongoose";

async function connectToDb() {
  const url = config.get<string>("MONGO_DB_URL");

  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectToDb;
