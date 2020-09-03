import mongoose from "mongoose";
import cron from "cron";
import { app } from "./app";
import { getAllLeaguesFromAPI } from "./service/api-service";
import { UpdateLeaguesHandler } from "./helpers/update-leagues-handler";
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

  var CronJob = cron.CronJob;
  var job = new CronJob(
    "0 * * * *",
    async function () {
      console.log("Update Leagues Job Started!");
      const rsp = await getAllLeaguesFromAPI();
      if (rsp != null) {
        await UpdateLeaguesHandler(rsp);
      }
      console.log("Update Leagues Job Finished!");
    },
    null,
    false,
    "America/Los_Angeles"
  );

  job.start();

  app.listen(3002, () => {
    console.log("Listening on port 3002 LEAGUES");
  });
};

start();
