import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
    );

    console.log("Database connected successfully");
    console.log("Host:", connectionInstance.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
