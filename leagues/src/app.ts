import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";

import { leagueByIdRouter } from "./routes/get";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use(leagueByIdRouter);

app.all("*", async (req, res) => {
  throw new Error("API route incorrect");
});

export { app };
