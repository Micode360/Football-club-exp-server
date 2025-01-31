"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NewsSchema = new Schema({
    title: {
        type: String,
        required: [true, "News name required"],
    },
    authorIds: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
    description: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    coverImage: {
        publicId: {
            type: String,
            required: false,
        },
        imgUrl: {
            type: String,
            required: false,
        }
    },
    league: {
        type: String,
        required: false,
    },
    categories: [{
            type: String,
            required: false,
        }],
    content: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.News = mongoose_1.default.models.News || mongoose_1.default.model("News", NewsSchema);
