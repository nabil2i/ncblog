import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async () => {
  const dbUrl = process.env.NODE_APP_MONGODB_URI;

  try {
    mongoose.set('strictQuery', false);

    const mongooseOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    await mongoose.connect(dbUrl, mongooseOptions);
    // console.log(`Connected to ${conn.connection.host}`);

  } catch(err) {
    console.log(err);
  }
}
