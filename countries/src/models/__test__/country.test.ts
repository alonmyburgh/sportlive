import { Country } from "../country";

it("implements optimistic concurrency control", async (done) => {
  const country = Country.build({
    country: "Italy",
    code: "IT",
    lastUpdate: new Date(),
    flag: "",
  });
  await country.save();

  const firstInstance = await Country.findById(country.id);
  const secondInstance = await Country.findById(country.id);

  firstInstance!.set({ code: "US" });
  secondInstance!.set({ code: "AL" });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const country = Country.build({
    country: "Italy",
    code: "IT",
    lastUpdate: new Date(),
    flag: "",
  });
  await country.save();
  expect(country.version).toEqual(0);

  await country.save();
  expect(country.version).toEqual(1);

  await country.save();
  expect(country.version).toEqual(2);
});
