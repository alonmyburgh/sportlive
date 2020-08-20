import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CountryAttrs {
  country: string;
  code: string;
  flag: string;
  lastUpdate: Date;  
}

interface CountryDoc extends mongoose.Document {
  country: string;
  code: string;
  flag: string;
  lastUpdate: Date;
  version: number;
}

interface CountryModel extends mongoose.Model<CountryDoc> {
  build(attrs: CountryAttrs): CountryDoc;
}

const countrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
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
countrySchema.set("versionKey", "version");
countrySchema.plugin(updateIfCurrentPlugin);

countrySchema.statics.build = (attrs: CountryAttrs) => {
  return new Country(attrs);
};

const Country = mongoose.model<CountryDoc, CountryModel>(
  "Country",
  countrySchema
);

export { Country };
