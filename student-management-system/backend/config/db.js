import mongoose from 'mongoose';

/**
 * Connects the Node.js application to MongoDB database using Mongoose ODM.
 * Mongoose handles object modeling and connection pooling automatically.
 */
const connectDB = async () => {
  try {
    // Attempt connection using MONGO_URI from environment variables (.env)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log successful connection host for debugging and verification
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any connection error and exit process with failure code (1)
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
