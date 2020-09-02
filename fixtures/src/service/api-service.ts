import axios from "axios";
import { FixturesObj } from "../models/fixture-interface";

export const getFixturesFromAPI = async (date: string) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://v2.api-football.com/fixtures/date/${date}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
        timeout: 10000,
      }
    );
    if (rsp.data.api.results == 0) {
      return undefined;
    }
    const jsonArray = rsp.data.api.fixtures;
    jsonArray.forEach((a) => {
      a.country = a.league.country;
    });
    return jsonArray;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const getFixtureFromAPI = async (fixtureId: string) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://v2.api-football.com/fixtures/id/${fixtureId}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
        timeout: 10000,
      }
    );

    if (rsp.data.api.results == 0) {
      return null;
    }
    
    const jsonArray = rsp.data.api.fixtures;
    
    return jsonArray[0];
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getFixturesByLeagueId = async (leagueId: string, date: string) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://v2.api-football.com/fixtures/league/${leagueId}/${date}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
      }
    );

    const jsonArray = rsp.data.api.fixtures;

    return jsonArray;
  } catch (error) {}

  return undefined;
};
