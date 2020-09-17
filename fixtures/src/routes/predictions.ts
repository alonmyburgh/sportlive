import express, { Request, Response } from "express";
import { getPredictionsFromAPI } from "../service/api-service";
import { getPredictionsRedisKey } from "../helpers/generate-redis-key";
import { redisWrapper } from "../redis-wrapper";

const router = express.Router();

router.get("/api/predictions", async (req: Request, res: Response) => {
  const fixtureId = req.query.fixtureId?.toString();

  if(!fixtureId) {
    return res.status(400).send({ error: "fixtureId is not valid" });
  }

  const REDIS_KEY = getPredictionsRedisKey(fixtureId);
  const value: string = await redisWrapper.client.get(REDIS_KEY);
  if (value && value !== null) {
    return res.status(200).send(JSON.parse(value));
  }

  const predictions = await getPredictionsFromAPI(fixtureId);
  if (predictions === null) {
    return res.status(500).send({ error: "Could not retrieve data from API" });
  }

  await redisWrapper.client.set(
    REDIS_KEY,
    JSON.stringify(predictions),
    "EX",
    60 * 15
  );

  return res.status(200).send(predictions);
});

export { router as predictionsRouter };
