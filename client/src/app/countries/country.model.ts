export class Fixtures {
  countries: CountriesResponse[] = [];
}

export class CountriesResponse {
  country: string;
  code: string;
  flag: string;
  leagues: LeaguesResponse[];
  matchCount: number;
  liveMatchCount: number;
  isExpand: boolean;
  isLoading: boolean;
}

export class LeaguesResponse {
  leagueId: number;
  name: string;
  season: number;
  logo: string;
  fixtures: FixturesResponse[];
}

export class FixturesResponse {
  fixture: {
    id: number;
    referee: string;
    timezone: string;
    date: Date;
    timestamp: Date;
    periods: {
      first: Date;
      second: Date;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number;
      away: number;
    };
    penalty: {
      home: number;
      away: number;
    };
  };
  events?: {
    time: {
      elapsed: number;
      extra: string;
    };
    team: {
      id: number;
      name: string;
      logo: string;
    };
    player: {
      id: number;
      name: string;
    };
    assist: {
      id: number;
      name: string;
    };
    type: string;
    detail: string;
    comments: string;
  }[];
  lineups?: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    coach: {
      id: number;
      name: string;
    };
    formation: string;
    startXI: {
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
      };
    }[];
    substitutes: {
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
      };
    }[];
  }[];
  statistics?: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    statistics: {
      type: string;
      value: number;
    }[];
  };
  players?: {
    team: {
      id: number;
      name: string;
      logo: string;
      update: Date;
    };
    players: {
      player: {
        id: number;
        name: string;
        photo: string;
      };
      statistics: {
        games: {
          minutes: number;
          number: number;
          position: string;
          rating: string;
          captain: boolean;
          substitute: boolean;
        };
        offsides: number;
        shots: {
          total: number;
          on: number;
        };
        goals: {
          total: number;
          conceded: number;
          assists: number;
          saves: number;
        };
        passes: {
          total: number;
          key: number;
          accuracy: string;
        };
        tackles: {
          total: number;
          blocks: number;
          interceptions: number;
        };
        duels: {
          total: number;
          won: number;
        };
        dribbles: {
          attempts: number;
          success: number;
          past: number;
        };
        fouls: {
          drawn: number;
          committed: number;
        };
        cards: {
          yellow: number;
          red: number;
        };
        penalty: {
          won: number;
          commited: number;
          scored: number;
          missed: number;
          saved: number;
        };
      }[];
    }[];
  };
}

export class LeaguesByIdRequest {
  leagueIds: string;
  date: string;
  countryCode: string;
}
