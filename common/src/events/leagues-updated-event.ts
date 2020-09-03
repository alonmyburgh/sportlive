import { Subjects } from "./subjects";

export interface LeaguesUpdatedEvent {
  subject: Subjects.LeaguesUpdated;
  data: {
    league_id: number;
    name: string;
    type: string;
    country: string;
    country_code: string;
    season: number;
    season_start: string;
    season_end: string;
    logo: string;
    flag: string;
    standings: number;
    is_current: number;
    coverage: {
      standings: boolean;
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics: boolean;
        players_statistics: boolean;
      };
      players: boolean;
      topScorers: boolean;
      predictions: boolean;
      odds: boolean;
    };
  }[];
}
