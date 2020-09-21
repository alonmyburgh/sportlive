import express, { Request, Response } from "express";
import { redisWrapper } from "../redis-wrapper";
import { getIsToday } from "../helpers/today-date";
import { getLeagueIdAndDateRedisKey } from "../helpers/generate-redis-key";
import { LeaguesResponse } from "../models/fixtures-response";
import { League } from "../models/league";
import { getFixturesByLeagueId } from "../service/api-service";

const router = express.Router();

router.post("/api/fixtures", async (req: Request, res: Response) => {
  const { leagueIds, date } = req.body;
  let response: LeaguesResponse[] = [];
  const year = date.split("-")[0];
  const leagueIdArray: string[] = leagueIds.split(",");

  for (const leagueId of leagueIdArray) {
    let REDIS_KEY = getLeagueIdAndDateRedisKey(date, leagueId);
    const value: string = await redisWrapper.client.get(REDIS_KEY);
    if (value && value !== null) {
      response.push(JSON.parse(value));
    } else {
      let apiRsp = await getFixturesByLeagueId(leagueId, date, year);
      if (apiRsp !== null && apiRsp.length > 0) {
        let struct: LeaguesResponse = {
          leagueId: apiRsp[0].league.id,
          name: apiRsp[0].league.name,
          logo: apiRsp[0].league.logo,
          season: apiRsp[0].league.season,
          fixtures: apiRsp,
        };

        await redisWrapper.client.set(
          REDIS_KEY,
          JSON.stringify(struct),
          "EX",
          60 * 2
        );

        response.push(struct);
      }
    }
  }

  res.send(response);
});

export { router as fixturesPostRouter };
