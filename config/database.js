import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "backendapi",
    });
    console.log("Database is connected!!!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
