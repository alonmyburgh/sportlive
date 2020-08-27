import { Subjects, Publisher, CountriesUpdatedEvent } from "@sportlive/common";

export class CountriesUpdatedPublisher extends Publisher<
  CountriesUpdatedEvent
> {
  subject: Subjects.CountriesUpdated = Subjects.CountriesUpdated;
}
