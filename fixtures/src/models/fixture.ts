import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { CountriesResponse } from "./fixtures-response";

interface FixtureAttrs {
  fixtureDate: string;
  fixtures: CountriesResponse[];
  lastUpdate: Date;
}

interface FixtureDoc extends mongoose.Document {
  fixtureDate: string;
  fixtures: CountriesResponse[];
  lastUpdate: Date;
  version: number;
}

interface FixtureModel extends mongoose.Model<FixtureDoc> {
  build(attrs: FixtureAttrs): FixtureDoc;
}

const fixtureSchema = new mongoose.Schema(
  {
    fixtureDate: {
      type: String,
      required: true,
    },
    fixtures: {
      type: Array,
      default: [],
    },
    leagueId: {
      type: Number,
    },
    lastUpdate: {
      type: mongoose.Schema.Types.Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
fixtureSchema.set("versionKey", "version");
fixtureSchema.plugin(updateIfCurrentPlugin);

fixtureSchema.statics.build = (attrs: FixtureAttrs) => {
  return new Fixture(attrs);
};

const Fixture = mongoose.model<FixtureDoc, FixtureModel>(
  "Fixture",
  fixtureSchema
);

export { Fixture, FixtureDoc };
