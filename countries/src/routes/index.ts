import express, { Request, Response } from "express";
import { Country } from "../models/country";
import axios from "axios";
import moment from "moment";
import { CountriesUpdatedPublisher } from "../events/publishers/countries-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.get("/api/countries", async (req: Request, res: Response) => {
  const countries = await Country.find({});

  if (!countries || countries.length == 0) {
    await getCountriesFromAPI();
    const apiCountries = await Country.find({});
    
    await new CountriesUpdatedPublisher(natsWrapper.client).publish(apiCountries);

    return res.send(apiCountries);
  }

  if (moment(new Date()).diff(moment(countries[0].lastUpdate), "days") > 7) {
    await Country.deleteMany({});
    await getCountriesFromAPI();
    const apiCountries = await Country.find({});

    await new CountriesUpdatedPublisher(natsWrapper.client).publish(apiCountries);

    return res.send(apiCountries);
  }

  await new CountriesUpdatedPublisher(natsWrapper.client).publish(countries);

  res.send(countries);
});

const getCountriesFromAPI = async () => {
  try {
    const rsp: CountriesObj = await axios.get(
      "https://v2.api-football.com/countries",
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-key":
          process.env.API_KEY,
          useQueryString: true,
        },
      }
    );

    const jsonArray = rsp.data.api.countries;

    for (let i = 0; i < jsonArray.length; i++) {
      const element = jsonArray[i];
      if (element.country && element.code) {
        let dbType = Country.build({
          country: element.country,
          code: element.code,
          flag: element.flag,
          lastUpdate: new Date(),
        });
        await dbType.save();
      }
    }
  } catch (error) {}
};

interface CountriesObj {
  data: {
    api: {
      results: number;
      countries: [
        {
          country: string;
          code: string;
          flag: string;
        }
      ];
    };
  };
}

export { router as countriesRouter };
