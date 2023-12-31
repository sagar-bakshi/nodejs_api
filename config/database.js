import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "backendapi",
    });
    console.log("Database is connected!!!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
