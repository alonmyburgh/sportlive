import express, { Request, Response } from "express";
import { League } from "../models/league";

const router = express.Router();

router.get("/api/league/:leagueId", async (req: Request, res: Response) => {
  const leagueId = req.params.leagueId;

  if (!leagueId) {
    return res.status(400).send({ error: "leagueId is not valid" });
  }

  const league = await League.findOne({
    "league.id": Number(leagueId),
  });

  if (league && league !== null) {
    return res.status(200).send(league);
  }

  return res.status(404).send();
});

export { router as leagueByIdRouter };
