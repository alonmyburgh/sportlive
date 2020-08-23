export class Fixtures {
  countries: CountriesResponse[] = [];
}

interface CountriesResponse {
  country: string;
  code: string;
  flag: string;
  leagues: LeaguesResponse[];
  matchCount: number;
  liveMatchCount: number;
}

interface LeaguesResponse {
  leagueId: number;
  name: string;
  type: string;
  season: number;
  seasonStart: Date;
  seasonEnd: Date;
  logo: string;
  fixtures: FixturesResponse[];
}

interface FixturesResponse {
  fixtureId: number;
  eventDate: Date;
  eventTimestamp: Date;
  firstHalfStart: Date;
  secondHalfStart: Date;
  round: string;
  status: string;
  statusShort: string;
  elapsed: number;
  venue: string;
  referee: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  goalsHomeTeam: number;
  goalsAwayTeam: number;
  score: {
    halftime: string;
    fulltime: string;
    extratime: string;
    penalty: string;
  };
}

interface FixtureTeam {
  teamId: number;
  teamName: string;
  logo: string;
}
