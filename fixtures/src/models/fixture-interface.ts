export interface CountriesObj {
    data: [
      {
        country: string;
        code: string;
        flag: string;
        lastUpdate: Date;
      }
    ];
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
        fixtures: [{}];
      };
    };
  }