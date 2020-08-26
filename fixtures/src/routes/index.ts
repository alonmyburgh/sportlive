import express, { Request, Response } from "express";
import { Fixture } from "../models/fixture";
import moment from "moment";
import { getCountriesFromService } from "../service/countries-service";
import { getFixturesFromAPI } from "../service/api-service";
import { saveResponse } from "../helpers/save-response";
import { getIsToday } from "../helpers/today-date";

const router = express.Router();

router.post("/api/fixturesbydate", async (req: Request, res: Response) => {
  const date: Date = req.body.date;
  const d = moment(date).utc().set({ hour: 0, minute: 0, second: 0 });
  
  const isTodayDate: boolean = getIsToday(d);

  let fixtures = await Fixture.findOne({
    fixtureDate: d.format("YYYY-MM-DD"),
  });

  if (fixtures === null) {
    fixtures = await getFixturesLogic(d);
    if (fixtures === null) {
      return res.status(500);
    }
  }

  if (
    isTodayDate &&
    moment(new Date()).diff(moment(fixtures.lastUpdate), "minutes") > 10
  ) {
    await Fixture.findByIdAndDelete(fixtures._id);
    fixtures = await getFixturesLogic(d);
    if (fixtures === null) {
      return res.status(500);
    }
  }

  return res.send(fixtures.fixtures);
});

const getFixturesLogic = async (d: moment.Moment) => {
  const countries = await getCountriesFromService();
  if (countries === undefined) {
    return null;
  }

  const rsp = await getFixturesFromAPI(d);

  if (rsp === undefined) {
    return null;
  }

  return await saveResponse(rsp, countries, d);
};

export { router as fixturesByDateRouter };
