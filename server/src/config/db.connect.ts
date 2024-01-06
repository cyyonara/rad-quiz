import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING as string);
    console.log('db connected!');
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
