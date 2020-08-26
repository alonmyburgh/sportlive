import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { FixturesResponse } from "./fixtures-response";

interface LeagueAttrs {
  leagueId: number;
  name: string;
  type?: string;
  season?: number;
  seasonStart?: Date;
  seasonEnd?: Date;
  logo: string;
  fixtures: FixturesResponse[];
  fixtureDate: string;
  lastUpdate: Date;
}

interface LeagueDoc extends mongoose.Document {
  leagueId: number;
  name: string;
  type?: string;
  season?: number;
  seasonStart?: Date;
  seasonEnd?: Date;
  logo: string;
  fixtures: FixturesResponse[];
  fixtureDate: string;
  lastUpdate: Date;
  version: number;
}

interface LeagueModel extends mongoose.Model<LeagueDoc> {
  build(attrs: LeagueAttrs): LeagueDoc;
}

const leagueSchema = new mongoose.Schema(
  {
    leagueId: {
      type: Number,
      required: true,
    },
    fixtures: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      required: true,
    },
    fixtureDate: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    type: {
      type: String,
    },
    season: {
      type: Number,
    },
    seasonStart: {
      type: mongoose.Schema.Types.Date,
    },
    seasonEnd: {
      type: mongoose.Schema.Types.Date,
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
leagueSchema.set("versionKey", "version");
leagueSchema.plugin(updateIfCurrentPlugin);

leagueSchema.statics.build = (attrs: LeagueAttrs) => {
  return new League(attrs);
};

const League = mongoose.model<LeagueDoc, LeagueModel>("League", leagueSchema);

export { League };
