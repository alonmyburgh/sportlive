import { Subjects, Publisher, LeaguesUpdatedEvent } from "@sportlive/common";

export class LeaguesUpdatedPublisher extends Publisher<
  LeaguesUpdatedEvent
> {
  subject: Subjects.LeaguesUpdated = Subjects.LeaguesUpdated;
}
