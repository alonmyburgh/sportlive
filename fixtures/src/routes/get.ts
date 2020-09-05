import express, { Request, Response } from "express";
import { getFixtureFromAPI } from "../service/api-service";
import { getFixtureIdRedisKey } from "../helpers/generate-redis-key";
import { redisWrapper } from "../redis-wrapper";

const router = express.Router();

router.get("/api/fixtures", async (req: Request, res: Response) => {
  const fixtureId = req.query.fixtureId?.toString();

  if(!fixtureId) {
    return res.status(400).send({ error: "FixtureId is not valid" });
  }

  const REDIS_KEY = getFixtureIdRedisKey(fixtureId);
  const value: string = await redisWrapper.client.get(REDIS_KEY);
  if (value && value !== null) {
    return res.status(200).send(JSON.parse(value));
  }

  const updatedFixture = await getFixtureFromAPI(fixtureId);
  if (updatedFixture === null) {
    return res.status(500).send({ error: "Could not retrieve data from API" });
  }

  await redisWrapper.client.set(
    REDIS_KEY,
    JSON.stringify(updatedFixture),
    "EX",
    30
  );

  return res.status(200).send(updatedFixture);
});

export { router as fixtureByIdRouter };
