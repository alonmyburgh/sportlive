import axios from "axios";
import { LeaguesObj } from "../models/leagues-response";

export const getAllLeaguesFromAPI = async () => {
  try {
    const rsp: LeaguesObj = await axios.get(`https://api-football-beta.p.rapidapi.com/leagues`, {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-key": process.env.API_KEY,
        useQueryString: true,
      },
      timeout: 10000,
    });
    
    if (rsp.data.results == 0) {
      return null;
    }
    const jsonArray = rsp.data.response;
    return jsonArray;
  } catch (error) {
    console.log(error);
  }

  return null;
};
