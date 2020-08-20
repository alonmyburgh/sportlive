import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

const start = async () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY must be defined");
  }

  if (process.env.NODE_ENV !== "production") {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.once("open", (_) => {
      console.log("Database connected");
    });

    db.on("error", (err) => {
      console.error("connection error:", err);
    });
  } else {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 COUNTRIES");
  });
};

start();
