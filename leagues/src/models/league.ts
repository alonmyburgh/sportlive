import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface LeagueAttrs {
  leagueId: number;
  name: string;
  type: string;
  country: string;
  countryCode: string;
  season: number;
  seasonStart: Date;
  seasonEnd: Date;
  logo: string;
  flag: string;
  isCurrent: boolean;
  lastUpdate: Date;  
}

interface LeagueDoc extends mongoose.Document {
  leagueId: number;
  name: string;
  type: string;
  country: string;
  countryCode: string;
  season: number;
  seasonStart: Date;
  seasonEnd: Date;
  logo: string;
  flag: string;
  isCurrent: boolean;
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
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    countryCode: {
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
    logo: {
      type: String,      
    },
    flag: {
      type: String,      
    },
    isCurrent: {
      type: Boolean,      
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

const League = mongoose.model<LeagueDoc, LeagueModel>(
  "League",
  leagueSchema
);

export { League };
