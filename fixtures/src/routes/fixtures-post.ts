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
  const isTodayDate: boolean = getIsToday(date);
  const leagueIdArray: string[] = leagueIds.split(",");

  for (const leagueId of leagueIdArray) {
    let REDIS_KEY = getLeagueIdAndDateRedisKey(date, leagueId);
    const value: string = await redisWrapper.client.get(REDIS_KEY);
    if (value && value !== null) {
      response.push(JSON.parse(value));
    } else {
      if (isTodayDate) {
        let apiRsp = await getFixturesByLeagueId(leagueId, date);
        if (apiRsp !== undefined && apiRsp.length > 0) {
          let struct: LeaguesResponse = {
            leagueId: apiRsp[0].league_id,
            name: apiRsp[0].league.name,
            logo: apiRsp[0].league.logo,
            fixtures: Array.from(
              apiRsp.map((fix) => {
                return {
                  fixtureId: fix.fixture_id,
                  eventDate: fix.event_date,
                  eventTimestamp: fix.event_timestamp,
                  firstHalfStart: fix.firstHalfStart,
                  secondHalfStart: fix.secondHalfStart,
                  round: fix.round,
                  status: fix.status,
                  statusShort: fix.statusShort,
                  elapsed: fix.elapsed,
                  venue: fix.venue,
                  referee: fix.referee,
                  homeTeam: {
                    teamId: fix.homeTeam.team_id,
                    teamName: fix.homeTeam.team_name,
                    logo: fix.homeTeam.logo,
                  },
                  awayTeam: {
                    teamId: fix.awayTeam.team_id,
                    teamName: fix.awayTeam.team_name,
                    logo: fix.awayTeam.logo,
                  },
                  goalsHomeTeam: fix.goalsHomeTeam,
                  goalsAwayTeam: fix.goalsAwayTeam,
                  score: fix.score,
                };
              })
            ),
          };

          await redisWrapper.client.set(
            REDIS_KEY,
            JSON.stringify(struct),
            "EX",
            60 * 2
          );

          response.push(struct);
        }
      } else {
        let league = await League.findOne({
          leagueId: Number(leagueId),
          fixtureDate: date,
        });

        if (league && league !== null) {
          let struct: LeaguesResponse = {
            leagueId: league.leagueId,
            name: league.name,
            type: league.type,
            season: league.season,
            seasonEnd: league.seasonEnd,
            seasonStart: league.seasonStart,
            logo: league.logo,
            fixtures: league.fixtures,
          };

          await redisWrapper.client.set(
            REDIS_KEY,
            JSON.stringify(struct),
            "EX",
            60 * 2
          );

          response.push(struct);
        } else {
          let apiRsp = await getFixturesByLeagueId(leagueId, date);
          if (apiRsp !== undefined && apiRsp.length > 0) {
            let struct: LeaguesResponse = {
              leagueId: apiRsp[0].league_id,
              name: apiRsp[0].league.name,
              logo: apiRsp[0].league.logo,
              fixtures: Array.from(
                apiRsp.map((fix) => {
                  return {
                    fixtureId: fix.fixture_id,
                    eventDate: fix.event_date,
                    eventTimestamp: fix.event_timestamp,
                    firstHalfStart: fix.firstHalfStart,
                    secondHalfStart: fix.secondHalfStart,
                    round: fix.round,
                    status: fix.status,
                    statusShort: fix.statusShort,
                    elapsed: fix.elapsed,
                    venue: fix.venue,
                    referee: fix.referee,
                    homeTeam: {
                      teamId: fix.homeTeam.team_id,
                      teamName: fix.homeTeam.team_name,
                      logo: fix.homeTeam.logo,
                    },
                    awayTeam: {
                      teamId: fix.awayTeam.team_id,
                      teamName: fix.awayTeam.team_name,
                      logo: fix.awayTeam.logo,
                    },
                    goalsHomeTeam: fix.goalsHomeTeam,
                    goalsAwayTeam: fix.goalsAwayTeam,
                    score: fix.score,
                  };
                })
              ),
            };

            let dbType = League.build({
              fixtureDate: date,
              fixtures: struct.fixtures,
              leagueId: struct.leagueId,
              logo: struct.logo,
              name: struct.name,
              seasonStart: struct.seasonStart,
              season: struct.season,
              type: struct.type,
              seasonEnd: struct.seasonEnd,
              lastUpdate: new Date(),
            });
            await dbType.save();

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
    }
  }

  res.send(response);
});

export { router as fixturesPostRouter };
