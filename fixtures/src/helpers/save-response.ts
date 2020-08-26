import { DbFixture, CountriesObj } from "../models/fixture-interface";
import { groupBy } from "./group-by";
import { CountriesResponse } from "../models/fixtures-response";
import { Fixture } from "../models/fixture";

export const saveResponse = async (
  rsp: DbFixture[],
  countries: CountriesObj,
  date: moment.Moment
) => {
  let countriesDict = countries.data.reduce(
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
          f.statusShort === "1H" ||
          f.statusShort === "2H" ||
          f.statusShort === "HT" ||
          f.statusShort === "ET" ||
          f.statusShort === "P"
      ).length,
      matchCount: value.length,
      leagues: Array.from(
        Object.entries(groupBy(value, "league_id")).map(([lkey, lval]) => {
          return {
            leagueId: Number(lkey),
          };
        })
      ),
    });
  });

  let dbType = Fixture.build({
    fixtureDate: date.format("YYYY-MM-DD"),
    fixtures: r,
    lastUpdate: new Date(),
  });
  await dbType.save();

  return dbType;
};
