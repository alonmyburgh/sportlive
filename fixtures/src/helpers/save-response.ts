import { DbFixture, CountriesObj } from "../models/fixture-interface";
import { groupBy } from "./group-by";
import { CountriesResponse } from "../models/fixtures-response";
import { Fixture } from "../models/fixture";

export const saveResponse = async (
  rsp: DbFixture[],
  countries: CountriesObj[],
  date: string
) => {
  let countriesDict = countries.reduce(
    (a, x) => ({ ...a, [x.country]: x }),
    {}
  );
  let r: CountriesResponse[] = [];
  Object.entries(groupBy(rsp, "country")).map(([key, val]) => {
    const value: any = val;
    if (countriesDict[key] === undefined) {
      countriesDict[key] = {
        code: key,
        flag: `/assets/img/${key}.svg`,
      };
    }

    r.push({
      code: countriesDict[key].code,
      country: key,
      flag: countriesDict[key].flag,
      liveMatchCount: value.filter(
        (f) =>
          f.fixture.status.short === "1H" ||
          f.fixture.status.short === "2H" ||
          f.fixture.status.short === "HT" ||
          f.fixture.status.short === "ET" ||
          f.fixture.status.short === "P"
      ).length,
      matchCount: value.length,
      leagues: Array.from(
        Object.entries(groupBy(value, "leagueId")).map(([lkey, lval]) => {
          return {
            leagueId: Number(lkey),
          };
        })
      ),
    });
  });

  let dbType = Fixture.build({
    fixtureDate: date,
    fixtures: r,
    lastUpdate: new Date(),
  });
  await dbType.save();

  return dbType;
};
