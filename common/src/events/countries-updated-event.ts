import { Subjects } from "./subjects";

export interface CountriesUpdatedEvent {
  subject: Subjects.CountriesUpdated;
  data: {
    country: string;
    code: string;
    flag: string;
    lastUpdate: Date;
    version: number;
  }[];
}
