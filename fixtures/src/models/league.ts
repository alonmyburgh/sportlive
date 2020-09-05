import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { LeaguesResponse } from "./fixtures-response";
import { DbFixture } from "./fixture-interface";

interface LeagueAttrs {
  leagueId: number;
  name: string;  
  season: number;  
  logo: string;
  fixtures: DbFixture[];
  fixtureDate: string;
  lastUpdate: Date;
}

interface LeagueDoc extends mongoose.Document {
  leagueId: number;
  name: string;
  season: number;  
  logo: string;
  fixtures: DbFixture[];
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
    season: {
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
leagueSchema.set("versionKey", "version");
leagueSchema.plugin(updateIfCurrentPlugin);

leagueSchema.statics.build = (attrs: LeagueAttrs) => {
  return new League(attrs);
};

const League = mongoose.model<LeagueDoc, LeagueModel>("League", leagueSchema);

export { League };
