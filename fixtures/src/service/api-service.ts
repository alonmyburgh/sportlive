import axios from 'axios';
import { Fixture } from "../models/fixture";
import { FixturesObj } from "../models/fixture-interface";

export const getFixturesFromAPI = async (date: moment.Moment) => {
    try {
      const rsp: FixturesObj = await axios.get(
        `https://api-football-v1.p.rapidapi.com/v2/fixtures/date/${date.format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            useQueryString: true,
          },
          params: {
            timezone: "Asia/Jerusalem",
          },
        }
      );
  
      const jsonArray = rsp.data.api.fixtures;
      jsonArray.forEach(a => {
        a.country = a.league.country;
      });
      let dbType = Fixture.build({
        fixtureDate: date.format("YYYY-MM-DD"),
        fixtures: jsonArray,
        lastUpdate: new Date(),
      });
      await dbType.save();
    } catch (error) {}
  };