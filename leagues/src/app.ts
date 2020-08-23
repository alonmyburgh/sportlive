import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { countriesRouter } from "./routes/index";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(countriesRouter);

app.all("*", async (req, res) => {
  throw new Error("API route incorrect");
});

export { app };
