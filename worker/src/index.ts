import dotenv from "dotenv";
import cron from "cron";
import { natsWrapper } from "./nats-wrapper";
import { getAllLeaguesFromAPI } from "./service/api-service";
import { LeaguesUpdatedPublisher } from "./events/publishers/leagues-updated-publisher";

const start = async () => {
  dotenv.config();

  if (!process.env.API_KEY) {
    throw new Error("API_KEY must be defined");
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
  } catch (err) {
    console.log(err);
  }

  var CronJob = cron.CronJob;
  var job = new CronJob(
    "8 * * * *",
    async function () {
      console.log("Leagues Job Started!");
      const rsp = await getAllLeaguesFromAPI();
      if (rsp != null) {
        let array = rsp;
        while (array && array.length > 0) {
          let temp = array.splice(0, 100);
          new LeaguesUpdatedPublisher(natsWrapper.client).publish(temp);
        }
      }
      console.log("Leagues Job Finished!");
    },
    null,
    false,
    "America/Los_Angeles"
  );
  // Use this if the 4th param is default value(false)
  job.start();
};

start();
