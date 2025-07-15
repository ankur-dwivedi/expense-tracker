import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as mongoose.ConnectOptions);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDB;
