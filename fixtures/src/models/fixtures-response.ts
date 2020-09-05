import { DbFixture } from "./fixture-interface";

export class Fixtures {
  countries: CountriesResponse[] = [];
}

export interface CountriesResponse {
  country: string;
  code: string;
  flag: string;  
  leagues: LeaguesLight[];
  matchCount: number;
  liveMatchCount: number;  
}

interface LeaguesLight {
  leagueId: number;
}

export interface LeaguesResponse {
  leagueId: number;
  name: string;
  season: number;
  logo: string;
  fixtures: DbFixture[];
}
