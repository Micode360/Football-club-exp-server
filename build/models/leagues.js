"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.League = void 0;
//import { cookies } from 'next/headers';
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LeagueSchema = new Schema({
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
}, {
    timestamps: true,
});
exports.League = mongoose_1.default.models.League || mongoose_1.default.model("League", LeagueSchema);
