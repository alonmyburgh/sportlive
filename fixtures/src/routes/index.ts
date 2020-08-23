import express, { Request, Response } from "express";
import { Fixture } from "../models/fixture";
import { parseFixtures } from "./fixture-parser";
import { CountriesObj, LeaguesObj } from "../models/fixture-interface";
import moment from "moment";
import { getCountriesFromService } from "../service/countries-service";
import { getLeaguesFromService } from "../service/leagues-service";
import { getFixturesFromAPI } from "../service/api-service";

const router = express.Router();

router.post("/api/fixturesbydate", async (req: Request, res: Response) => {
  const date: Date = req.body.date;
  const d = moment(date).utc().set({ hour: 0, minute: 0, second: 0 });
  const now = moment(new Date()).utc().set({ hour: 0, minute: 0, second: 0 });
  let isTodayDate: boolean;

  if (d.diff(now, "hours") > 22 || d.diff(now, "hours") < 0) {
    isTodayDate = false;
  } else {
    isTodayDate = true;
  }

  let fixtures = await Fixture.find({
    fixtureDate: d.format("YYYY-MM-DD"),
  });

  if (!fixtures || fixtures.length == 0) {
    await getFixturesFromAPI(d);
    fixtures = await Fixture.find({
      fixtureDate: d.format("YYYY-MM-DD"),
    });
  }

  if (
    isTodayDate &&
    moment(new Date()).diff(moment(fixtures[0].lastUpdate), "minutes") > 10
  ) {
    await Fixture.findByIdAndDelete(fixtures[0]._id);
    await getFixturesFromAPI(d);
    fixtures = await Fixture.find({
      fixtureDate: d.format("YYYY-MM-DD"),
    });
  }

  let countries: CountriesObj | undefined;
  let leagues: LeaguesObj | undefined;

  if (fixtures && fixtures[0].fixtures && fixtures[0].fixtures.length > 0) {
    countries = await getCountriesFromService();
    leagues = await getLeaguesFromService();
  }

  if (!countries || !leagues) {
    return res.status(500);
  }

  const r = parseFixtures(fixtures, countries, leagues);

  return res.send(r);
});

export { router as fixturesByDateRouter };
