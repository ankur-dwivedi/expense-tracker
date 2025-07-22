import mongoose from 'mongoose';

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDB;
