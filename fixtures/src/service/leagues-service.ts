import axios from 'axios';
import { LeaguesObj } from "../models/fixture-interface";

export const getLeaguesFromService = async () => {
    let url = "";
  
    if (process.env.NODE_ENV !== "production") {
      url = "http://localhost:3002/api/leagues";
    } else {
      url = "http://leagues-srv:3002/api/leagues";
    }
  
    try {
      const rsp: LeaguesObj = await axios.get(url);
  
      return rsp;
    } catch (error) {
      console.log("error", error);
    }
  
    return undefined;
  };