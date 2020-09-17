import express, { Request, Response } from "express";
import { getStandingsFromAPI } from "../service/api-service";
import { getStandingsRedisKey } from "../helpers/generate-redis-key";
import { redisWrapper } from "../redis-wrapper";

const router = express.Router();

router.get("/api/standings", async (req: Request, res: Response) => {
  const leagueId = req.query.leagueId?.toString();
  const season = req.query.season?.toString();

  if(!leagueId || !season) {
    return res.status(400).send({ error: "LeagueId or Season is not valid" });
  }

  const REDIS_KEY = getStandingsRedisKey(leagueId, season);
  const value: string = await redisWrapper.client.get(REDIS_KEY);
  if (value && value !== null) {
    return res.status(200).send(JSON.parse(value));
  }

  const standings = await getStandingsFromAPI(leagueId, season);
  if (standings === null) {
    return res.status(500).send({ error: "Could not retrieve data from API" });
  }

  await redisWrapper.client.set(
    REDIS_KEY,
    JSON.stringify(standings),
    "EX",
    60 * 15
  );

  return res.status(200).send(standings);
});

export { router as standingsRouter };
