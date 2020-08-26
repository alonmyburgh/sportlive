import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { redisWrapper } from './redis-wrapper';

const start = async () => {
  dotenv.config();
  
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.API_KEY) {
    throw new Error("API_KEY must be defined");
  }

  if (!process.env.REDIS_PORT) {
    throw new Error("REDIS_PORT must be defined");
  }
  
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL must be defined");
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

  try {
    await redisWrapper.connect(process.env.REDIS_URL, process.env.REDIS_PORT);
    redisWrapper.client.on("close", () => {
      console.log("Redis connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => redisWrapper.client.close());
    process.on("SIGTERM", () => redisWrapper.client.close());
  } catch (err) {
    console.log(err);
  }

  app.listen(3001, () => {
    console.log('Listening on port 3001 FIXTURES');
  });
};

start();
