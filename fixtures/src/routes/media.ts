import express, { Request, Response } from "express";
import { getMediaFromAPI } from "../service/api-service";

const router = express.Router();

router.get("/api/media", async (req: Request, res: Response) => {
  const query = req.query.query?.toString();

  if(!query) {
    return res.status(400).send({ error: "query is not valid" });
  }

  const twits = await getMediaFromAPI(query);
  if (twits === null) {
    return res.status(500).send({ error: "Could not retrieve data from API" });
  }

  res.status(200).send(twits);
});

export { router as mediaRouter };
