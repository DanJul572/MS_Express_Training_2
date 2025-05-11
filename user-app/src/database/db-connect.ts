import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    if (config.MONGO_URL) {
      await mongoose.connect(config.MONGO_URL);
      return console.info('Database connected');
    }
    throw 'MONGO_URL URL is not defined';
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
