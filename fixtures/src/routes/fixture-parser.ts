import { FixtureDoc } from "../models/fixture";
import { Fixtures } from "../models/fixtures-response";
import { CountriesObj, LeaguesObj } from "../models/fixture-interface";

export function parseFixtures(fixtures: FixtureDoc[], countries: CountriesObj, leagues: LeaguesObj): Fixtures {
    let r = new Fixtures();

    for (let i = 0; i < fixtures.length; i++) {
      const element = fixtures[i];

      for (let j = 0; j < element.fixtures.length; j++) {
        const e = element.fixtures[j];

        let country = countries.data.find((c) => {
          return c.country === e.league.country;
        });

        let league = leagues.data.find((l) => {
          return l.leagueId === e.league_id;
        });

        if (country && league) {
          let foundIndex = r.countries.findIndex(
            (c) => c.country === country?.country
          );
          if (foundIndex < 0) {
            r.countries.push({
              code: country.code,
              country: country.country,
              flag: country.flag,
              leagues: [
                {
                  leagueId: league.leagueId,
                  name: league.name,
                  type: league.type,
                  season: league.season,
                  seasonStart: league.seasonStart,
                  seasonEnd: league.seasonEnd,
                  logo: league.logo,
                  fixtures: [
                    {
                      fixtureId: e.fixture_id,
                      eventDate: e.event_date,
                      eventTimestamp: e.event_timestamp,
                      firstHalfStart: e.firstHalfStart,
                      secondHalfStart: e.secondHalfStart,
                      round: e.round,
                      status: e.status,
                      statusShort: e.statusShort,
                      elapsed: e.elapsed,
                      venue: e.venue,
                      referee: e.referee,
                      homeTeam: {
                        teamId: e.homeTeam.team_id,
                        teamName: e.homeTeam.team_name,
                        logo: e.homeTeam.logo,
                      },
                      awayTeam: {
                        teamId: e.awayTeam.team_id,
                        teamName: e.awayTeam.team_name,
                        logo: e.awayTeam.logo,
                      },
                      goalsHomeTeam: e.goalsHomeTeam,
                      goalsAwayTeam: e.goalsAwayTeam,
                      score: {
                        halftime: e.score.halftime,
                        fulltime: e.score.fulltime,
                        extratime: e.score.extratime,
                        penalty: e.score.penalty,
                      },
                    },
                  ],
                },
              ],
              liveMatchCount: 0,
              matchCount: 0,
            });
          } else {
            let foundLeagueIndex = r.countries[foundIndex].leagues.findIndex(
              (l) => l.leagueId === league?.leagueId
            );

            if (foundLeagueIndex < 0) {
              r.countries[foundIndex].leagues.push({
                leagueId: league.leagueId,
                name: league.name,
                type: league.type,
                season: league.season,
                seasonStart: league.seasonStart,
                seasonEnd: league.seasonEnd,
                logo: league.logo,
                fixtures: [
                  {
                    fixtureId: e.fixture_id,
                    eventDate: e.event_date,
                    eventTimestamp: e.event_timestamp,
                    firstHalfStart: e.firstHalfStart,
                    secondHalfStart: e.secondHalfStart,
                    round: e.round,
                    status: e.status,
                    statusShort: e.statusShort,
                    elapsed: e.elapsed,
                    venue: e.venue,
                    referee: e.referee,
                    homeTeam: {
                      teamId: e.homeTeam.team_id,
                      teamName: e.homeTeam.team_name,
                      logo: e.homeTeam.logo,
                    },
                    awayTeam: {
                      teamId: e.awayTeam.team_id,
                      teamName: e.awayTeam.team_name,
                      logo: e.awayTeam.logo,
                    },
                    goalsHomeTeam: e.goalsHomeTeam,
                    goalsAwayTeam: e.goalsAwayTeam,
                    score: {
                      halftime: e.score.halftime,
                      fulltime: e.score.fulltime,
                      extratime: e.score.extratime,
                      penalty: e.score.penalty,
                    },
                  },
                ],
              });
            } else {
              r.countries[foundIndex].leagues[foundLeagueIndex].fixtures.push({
                fixtureId: e.fixture_id,
                eventDate: e.event_date,
                eventTimestamp: e.event_timestamp,
                firstHalfStart: e.firstHalfStart,
                secondHalfStart: e.secondHalfStart,
                round: e.round,
                status: e.status,
                statusShort: e.statusShort,
                elapsed: e.elapsed,
                venue: e.venue,
                referee: e.referee,
                homeTeam: {
                  teamId: e.homeTeam.team_id,
                  teamName: e.homeTeam.team_name,
                  logo: e.homeTeam.logo,
                },
                awayTeam: {
                  teamId: e.awayTeam.team_id,
                  teamName: e.awayTeam.team_name,
                  logo: e.awayTeam.logo,
                },
                goalsHomeTeam: e.goalsHomeTeam,
                goalsAwayTeam: e.goalsAwayTeam,
                score: {
                  halftime: e.score.halftime,
                  fulltime: e.score.fulltime,
                  extratime: e.score.extratime,
                  penalty: e.score.penalty,
                },
              });
            }
          }
        }
      }
    }

    r.countries?.forEach((e) => {
        let cnt = 0;
        let cntLive = 0;
        e.leagues?.forEach((element) => {
          cnt += element.fixtures.length;
          element.fixtures.forEach((fix) => {
            if (
              fix.statusShort === "1H" ||
              fix.statusShort === "2H" ||
              fix.statusShort === "HT" ||
              fix.statusShort === "ET" ||
              fix.statusShort === "P"
            ) {
              cntLive++;
            }
          });
        });
        e.matchCount = cnt;
        e.liveMatchCount = cntLive;
      });

    return r;
}