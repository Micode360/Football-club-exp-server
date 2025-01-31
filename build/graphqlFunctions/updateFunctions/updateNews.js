"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNews = void 0;
const user_1 = require("../../models/user");
const news_1 = require("../../models/news");
const base_1 = __importDefault(require("../../db/base"));
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
const pubsub_1 = require("../../graphql/subscriptions/pubsub");
(0, base_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const updateNews = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === "unauthorized") {
        return {};
    }
    const { id, authorIds, userId, title, coverImage, description, author, league, categories, content } = input;
    const newsUpdate = {
        authorIds,
        userId,
        title,
        coverImage,
        description,
        author,
        league,
        categories,
        content
    };
    try {
        const user = yield user_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        const news = yield news_1.News.findOne({ _id: id });
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
                value: null,
            };
        }
        if ((user.role !== 'Super Admin' && news.authorIds.includes(user === null || user === void 0 ? void 0 : user._id)) ||
            user.role === 'Super Admin') {
            news.set(newsUpdate);
            yield news.save();
            const channel = `NEWS_UPDATE`;
            pubsub_1.pubsub.publish(channel, { newsUpdate: Object.assign(Object.assign({}, newsUpdate), { id, createdAt: news.createdAt }) });
        }
        else {
            return {
                success: false,
                status: 403,
                message: "You are not authorized to update news"
            };
        }
        return {
            success: true,
            status: 200,
            message: "News updated successfully",
        };
    }
    catch (error) {
        console.log(error, "error from news update server");
        throw new Error("Error updating user: " + error.message);
    }
});
exports.updateNews = updateNews;
