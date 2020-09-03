import axios from "axios";

export const getAllLeaguesFromAPI = async () => {
  try {
    const rsp = await axios.get(`https://v2.api-football.com/leagues`, {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-key": process.env.API_KEY,
        useQueryString: true,
      },
      timeout: 10000,
    });
    if (rsp.data.api.results == 0) {
      return null;
    }
    const jsonArray = rsp.data.api.leagues;
    return jsonArray;
  } catch (error) {
    console.log(error);
  }

  return null;
};
