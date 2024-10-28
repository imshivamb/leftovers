import mongoose from "mongoose";

// Database Connection
export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}