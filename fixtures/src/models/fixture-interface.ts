export interface CountriesObj {
  country: string;
  code: string;
  flag: string;
  lastUpdate: Date;
}

export interface LeaguesObj {
  data: [
    {
      leagueId: number;
      name: string;
      type: string;
      country: string;
      countryCode: string;
      season: number;
      seasonStart: Date;
      seasonEnd: Date;
      logo: string;
      flag: string;
      isCurrent: boolean;
      lastUpdate: Date;
    }
  ];
}

export interface FixturesObj {
  data: {
    api: {
      results: number;
      fixtures: DbFixture[];
    };
  };
}

export interface DbFixture {
  fixture_id: number;
  league_id: number;
  country: string;
  league: {
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
  event_date: Date;
  event_timestamp: Date;
  firstHalfStart: Date;
  secondHalfStart: Date;
  round: string;
  status: string;
  statusShort: string;
  elapsed: number;
  venue: string;
  referee: string;
  homeTeam: {
    team_id: number;
    team_name: string;
    logo: string;
  };
  awayTeam: {
    team_id: number;
    team_name: string;
    logo: string;
  };
  goalsHomeTeam: number;
  goalsAwayTeam: number;
  score: {
    halftime: string;
    fulltime: string;
    extratime: string;
    penalty: string;
  };
}
