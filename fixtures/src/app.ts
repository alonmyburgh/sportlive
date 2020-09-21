import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";

import { fixturesByDateRouter } from "./routes/index";
import { fixturesPostRouter } from "./routes/fixtures-post";
import { fixtureByIdRouter } from "./routes/get";
import { standingsRouter } from "./routes/standings";
import { predictionsRouter } from "./routes/predictions";
import { mediaRouter } from "./routes/media";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use(fixturesByDateRouter);
app.use(fixturesPostRouter);
app.use(fixtureByIdRouter);
app.use(standingsRouter);
app.use(predictionsRouter);
app.use(mediaRouter);

app.all("*", async (req, res) => {
  throw new Error("API route incorrect");
});

export { app };
