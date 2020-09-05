import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface LeagueAttrs {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: {
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      };
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      predictions: boolean;
      odds: boolean;
    };
  }[];
  lastUpdate: Date;
}

interface LeagueDoc extends mongoose.Document {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: {
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      };
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      predictions: boolean;
      odds: boolean;
    };
  }[];
  lastUpdate: Date;
  version: number;
}

interface LeagueModel extends mongoose.Model<LeagueDoc> {
  build(attrs: LeagueAttrs): LeagueDoc;
}

const leagueSchema = new mongoose.Schema(
  {
    league: {
      type: Object,
      required: true,
    },
    country: {
      type: Object,
      required: true,
    },
    seasons: {
      type: Array,
      required: true,
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
