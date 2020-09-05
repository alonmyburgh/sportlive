import axios from "axios";
import { FixturesObj } from "../models/fixture-interface";

export const getFixturesFromAPI = async (date: string) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://api-football-beta.p.rapidapi.com/fixtures?date=${date}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
        timeout: 10000,
      }
    );

    if (rsp.data.results == 0) {
      return null;
    }
    const jsonArray = rsp.data.response;
    jsonArray.forEach((a) => {
      a.country = a.league.country;
      a.leagueId = a.league.id;
    });
    return jsonArray;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getFixtureFromAPI = async (fixtureId: string) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://api-football-beta.p.rapidapi.com/fixtures?id=${fixtureId}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
        timeout: 10000,
      }
    );

    if (rsp.data.results == 0) {
      return null;
    }

    const jsonArray = rsp.data.response;

    return jsonArray[0];
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getFixturesByLeagueId = async (
  leagueId: string,
  date: string,
  year: string
) => {
  try {
    const rsp: FixturesObj = await axios.get(
      `https://api-football-beta.p.rapidapi.com/fixtures?league=${leagueId}&date=${date}&season=${year}`,
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY,
          useQueryString: true,
        },
        params: {
          timezone: "Asia/Jerusalem",
        },
      }
    );

    const jsonArray = rsp.data.response;

    return jsonArray;
  } catch (error) {}

  return null;
};
