//import { cookies } from 'next/headers';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LeagueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "League name required"],
    },
    logo: {
        publicId: {
          type: String,
          required: false,
        },
        imgUrl: {
          type: String,
          required: false,
        }
      },
    country: {
      imgPath: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      }
    },
    description: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    backgroundGradient: {
        fromColor: {
          type: String,
          required: false,
        },
        toColor: {
          type: String,
          required: false,
        }
      },
      socials: {
        facebook: {
          type: String,
          required: false,
        },
        instagram: {
          type: String,
          required: false,
        },
        xlink: {
            type: String,
            required: false,
        },
        youtube: {
            type: String,
            required: false,
        },
      },
  },
  {
    timestamps: true,
  }
);



export const League = mongoose.models.League || mongoose.model("League", LeagueSchema);