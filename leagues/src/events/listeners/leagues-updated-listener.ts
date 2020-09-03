import { Listener, Subjects, LeaguesUpdatedEvent } from "@sportlive/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { League } from "../../models/league";

export class LeaguesUpdatedListener extends Listener<LeaguesUpdatedEvent> {
  subject: Subjects.LeaguesUpdated = Subjects.LeaguesUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: LeaguesUpdatedEvent["data"], msg: Message) {
    await League.deleteMany({});
    for (const league of data) {
      if (league.league_id && league.name) {
        let dbType = League.build({
          country: league.country,
          countryCode: league.country_code,
          coverage: {
            fixtures: {
              events: league.coverage.fixtures.events,
              lineups: league.coverage.fixtures.lineups,
              playersStatistics: league.coverage.fixtures.players_statistics,
              statistics: league.coverage.fixtures.statistics,
            },
            odds: league.coverage.odds,
            players: league.coverage.players,
            predictions: league.coverage.predictions,
            standings: league.coverage.standings,
            topScorers: league.coverage.topScorers,
          },
          flag: league.flag,
          leagueId: league.league_id,
          logo: league.logo,
          name: league.name,
          season: league.season,
          seasonEnd: league.season_end,
          seasonStart: league.season_start,
          type: league.type,
          lastUpdate: new Date(),
        });
        await dbType.save();
      }
    }

    msg.ack();
  }
}
