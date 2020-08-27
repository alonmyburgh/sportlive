import axios from "axios";
import { CountriesObj } from "../models/fixture-interface";
import { Country } from "../models/country";
import moment from "moment";

export const getCountriesFromService = async () => {
  let url = "";

  if (process.env.NODE_ENV !== "production") {
    url = "http://localhost:3000/api/countries";
  } else {
    url = "http://countries-srv:3000/api/countries";
  }

  try {
    const rsp = await axios.get<CountriesObj[]>(url);
    return rsp.data;
  } catch (error) {
    console.log("error", error);
  }

  return undefined;
};

export const getCountriesFromDb = async () => {
  const countries = await Country.find({});
  if (!countries || countries.length == 0) {
    return undefined;
  }

  if(moment(new Date()).diff(moment(countries[0].lastUpdate), "days") > 7) {
    await Country.deleteMany({});
    return undefined;
  }

  let obj: CountriesObj[] = countries.map((country) => {
    return {
      country: country.country,
      code: country.code,
      flag: country.flag,
      lastUpdate: country.lastUpdate,
    };
  });

  return obj;
};
