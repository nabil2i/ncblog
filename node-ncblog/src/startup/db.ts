import mongoose, { MongooseOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async () => {
  const dbUrl = process.env.NODE_APP_MONGODB_URI as string;

  try {
    mongoose.set('strictQuery', false);

    const mongooseOptions: MongooseOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    if (dbUrl) {
      await mongoose.connect(dbUrl, mongooseOptions);
      // console.log(`Connected to ${conn.connection.host}`);
    } else {
      throw new Error('Database URL is undefined.');
    }

  } catch(err) {
    console.log(err);
  }
}
