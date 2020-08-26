import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

const start = async () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.API_KEY) {
    throw new Error("API_KEY must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("connection error:", err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 COUNTRIES");
  });
};

start();
