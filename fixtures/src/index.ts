import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { redisWrapper } from "./redis-wrapper";
import { natsWrapper } from "./nats-wrapper";
import { CountriesUpdatedListener } from "./events/listeners/countries-updated-listener";

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

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  if (!process.env.TWITTER_TOKEN) {
    throw new Error("TWITTER_TOKEN must be defined");
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

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close()); 
    
    new CountriesUpdatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }

  app.listen(3001, () => {
    console.log("Listening on port 3001 FIXTURES");
  });
};

start();
