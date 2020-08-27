import { Listener, Subjects, CountriesUpdatedEvent } from "@sportlive/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Country } from "../../models/country";

export class CountriesUpdatedListener extends Listener<CountriesUpdatedEvent> {
  subject: Subjects.CountriesUpdated = Subjects.CountriesUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: CountriesUpdatedEvent["data"], msg: Message) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.country && element.code) {
        let dbType = Country.build({
          country: element.country,
          code: element.code,
          flag: element.flag,
          lastUpdate: new Date(),
        });
        await dbType.save();
      }
    }

    msg.ack();
  }
}
