import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface LeagueAttrs {
  leagueId: number;
  name: string;
  type: string;
  country: string;
  countryCode: string;
  season: number;
  seasonStart: string;
  seasonEnd: string;
  logo: string;
  flag: string;
  coverage: {
    standings: boolean;
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics: boolean;
      playersStatistics: boolean;
    };
    players: boolean;
    topScorers: boolean;
    predictions: boolean;
    odds: boolean;
  };
  lastUpdate: Date;
}

interface LeagueDoc extends mongoose.Document {
  leagueId: number;
  name: string;
  type: string;
  country: string;
  countryCode: string;
  season: number;
  seasonStart: string;
  seasonEnd: string;
  logo: string;
  flag: string;
  coverage: {
    standings: boolean;
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics: boolean;
      playersStatistics: boolean;
    };
    players: boolean;
    topScorers: boolean;
    predictions: boolean;
    odds: boolean;
  };
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
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    country: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    season: {
      type: Number,
    },
    seasonStart: {
      type: String,
    },
    seasonEnd: {
      type: String,
    },
    logo: {
      type: String,
    },
    flag: {
      type: String,
    },
    coverage: {
        type: Object,
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
