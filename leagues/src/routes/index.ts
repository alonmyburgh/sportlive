import express, { Request, Response } from "express";
import { League } from "../models/league";
import axios from "axios";
import moment from "moment";

const router = express.Router();

router.get("/api/leagues", async (req: Request, res: Response) => {
  const leagues = await League.find({});

  if (!leagues || leagues.length == 0) {
    await getLeaguesFromAPI();
    const apiLeagues = await League.find({});

    return res.send(apiLeagues);
  }

  if (moment(new Date()).diff(moment(leagues[0].lastUpdate), "days") > 1) {
    await League.deleteMany({});
    await getLeaguesFromAPI();
    const apiLeagues = await League.find({});

    return res.send(apiLeagues);
  }

  res.send(leagues);
});

const getLeaguesFromAPI = async () => {
  try {
    const rsp: LeaguesObj = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v2/leagues",
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          useQueryString: true,
        },
      }
    );

    const jsonArray = rsp.data.api.leagues;

    for (let i = 0; i < jsonArray.length; i++) {
      const element = jsonArray[i];
      let dbType = League.build({
        leagueId: element.league_id,
        name: element.name,
        type: element.type,
        country: element.country,
        countryCode: element.country_code,
        season: element.season,
        seasonStart: element.season_start,
        seasonEnd: element.season_end,
        logo: element.logo,
        flag: element.flag,
        isCurrent: element.is_current == 1 ? true : false,
        lastUpdate: new Date(),
      });
      await dbType.save();
    }
  } catch (error) {}
};

interface LeaguesObj {
  data: {
    api: {
      results: number;
      leagues: [
        {
          league_id: number;
          name: string;
          type: string;
          country: string;
          country_code: string;
          season: number;
          season_start: Date;
          season_end: Date;
          logo: string;
          flag: string;
          standings: number;
          is_current: number;
          coverage: {};
        }
      ];
    };
  };
}

export { router as countriesRouter };
