import request from "supertest";
import { app } from "../../app";

it("can fetch a list of tickets", async () => {
  const response = await request(app).get("/api/countries").send().expect(200);

  expect(response.body.length).toEqual(3);
});
