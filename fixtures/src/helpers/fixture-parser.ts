import { FixtureDoc } from "../models/fixture";
import { Fixtures } from "../models/fixtures-response";
import { groupBy } from "./group-by";
import { CountriesObj, LeaguesObj } from "../models/fixture-interface";

export function parseFixtures(
  fixture: FixtureDoc,
  countries: CountriesObj,
  leagues: LeaguesObj
): Fixtures {
  let r = new Fixtures();

  let countriesDict = countries.data.reduce(
    (a, x) => ({ ...a, [x.country]: x }),
    {}
  );
  let leaguesDict = leagues.data.reduce(
    (a, x) => ({ ...a, [x.leagueId]: x }),
    {}
  );

  Object.entries(groupBy(fixture.fixtures, "country")).map(([key, val]) => {
    const value: any = val;
    if(countriesDict[key] === undefined) {
      countriesDict[key] = {
        code: key,
        flag: `/assets/img/${key}.svg`
      }
    }
    r.countries.push({
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
          const lvalue: any = lval;
          if(leaguesDict[lkey] === undefined) {
            leaguesDict[lkey] = {
              leagueId: Number(lkey),
              name: 'no league',
              type: 'no league',
              season: 'no league',
             seasonStart: 'no league',
              seasonEnd: 'no league',
              logo: 'no league',
              fixtures: []
            }
          }
          return {
            leagueId: Number(lkey),
            name: leaguesDict[lkey].name,
            type: leaguesDict[lkey].type,
            season: leaguesDict[lkey].season,
            seasonStart: leaguesDict[lkey].seasonStart,
            seasonEnd: leaguesDict[lkey].seasonEnd,
            logo: leaguesDict[lkey].logo,
            fixtures: Array.from(lvalue).map((fix: any) => {
              return {
                fixtureId: fix.fixture_id,
                eventDate: fix.event_date,
                eventTimestamp: fix.event_timestamp,
                firstHalfStart: fix.firstHalfStart,
                secondHalfStart: fix.secondHalfStart,
                round: fix.round,
                status: fix.status,
                statusShort: fix.statusShort,
                elapsed: fix.elapsed,
                venue: fix.venue,
                referee: fix.referee,
                homeTeam: {
                  teamId: fix.homeTeam.team_id,
                  teamName: fix.homeTeam.team_name,
                  logo: fix.homeTeam.logo,
                },
                awayTeam: {
                  teamId: fix.awayTeam.team_id,
                  teamName: fix.awayTeam.team_name,
                  logo: fix.awayTeam.logo,
                },
                goalsHomeTeam: fix.goalsHomeTeam,
                goalsAwayTeam: fix.goalsAwayTeam,
                score: {
                  halftime: fix.score.halftime,
                  fulltime: fix.score.fulltime,
                  extratime: fix.score.extratime,
                  penalty: fix.score.penalty,
                },
              };
            }),
          };
        })
      ),
    });
  });

  return r;
}
