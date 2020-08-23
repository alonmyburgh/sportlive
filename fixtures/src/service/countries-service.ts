import axios from 'axios';
import { CountriesObj } from "../models/fixture-interface";

export const getCountriesFromService = async () => {
    let url = "";
  
    if (process.env.NODE_ENV !== "production") {
      url = "http://localhost:3000/api/countries";
    } else {
      url = "http://countries-srv:3000/api/countries";
    }
  
    try {
      const rsp: CountriesObj = await axios.get(url);
  
      return rsp;
    } catch (error) {
      console.log("error", error);
    }
  
    return undefined;
  };