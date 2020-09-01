import express, { Request, Response } from "express";
import { Fixture } from "../models/fixture";
import moment from "moment";
import {
  getCountriesFromService,
  getCountriesFromDb,
} from "../service/countries-service";
import { getFixturesFromAPI } from "../service/api-service";
import { saveResponse } from "../helpers/save-response";
import { getIsToday } from "../helpers/today-date";

const router = express.Router();

router.post("/api/fixturesbydate", async (req: Request, res: Response) => {
  const date: string = req.body.date;  
  const isTodayDate: boolean = getIsToday(date);

  let fixtures = await Fixture.findOne({
    fixtureDate: date,
  });

  if (fixtures === null) {
    fixtures = await getFixturesLogic(date);
    if (fixtures === null || fixtures === undefined) {
      return res.status(500).send();
    }
  }

  if (
    isTodayDate &&
    moment(new Date()).diff(moment(fixtures.lastUpdate), "minutes") > 10
  ) {
    await Fixture.findByIdAndDelete(fixtures._id);
    fixtures = await getFixturesLogic(date);
    if (fixtures === null) {
      return res.status(500);
    }
  }

  return res.send(fixtures.fixtures);
});

const getFixturesLogic = async (d: string) => {
  let countries = await getCountriesFromDb();

  if (countries === undefined || countries.length == 0) {
    countries = await getCountriesFromService();
  }

  if (countries === undefined || countries.length == 0) {
    return null;
  }

  const rsp = await getFixturesFromAPI(d);

  if (rsp === undefined || rsp.length == 0) {
    return null;
  }

  return await saveResponse(rsp, countries, d);
};

export { router as fixturesByDateRouter };
