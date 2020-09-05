import { LeaguesResponse } from "../models/leagues-response";
import { League } from "../models/league";

export const UpdateLeaguesHandler = async (rsp: LeaguesResponse[]) => {
  await League.deleteMany({});
  for (const league of rsp) {
    if (league.league && league.league.id && league.league.name) {
      let dbType = League.build({
        country: league.country,
        league: league.league,
        seasons: league.seasons,
        lastUpdate: new Date(),
      });
      await dbType.save();
    }
  }
};
