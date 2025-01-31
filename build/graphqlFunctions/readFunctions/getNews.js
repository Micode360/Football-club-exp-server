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
exports.getNews = void 0;
const news_1 = require("../../models/news");
const base_1 = __importDefault(require("../../db/base"));
(0, base_1.default)();
const getNews = (parent, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = args;
    if (contextValue.user === "unauthorized") {
        return [];
    }
    // If no limit is provided, return all news (first load scenario)
    if (!limit) {
        const allNews = yield news_1.News.find()
            .populate('authorIds', 'firstName lastName profilePic');
        return allNews;
    }
    // If limit is provided, return the latest 'limit' number of news items
    const limitedNews = yield news_1.News.find()
        .populate('authorIds', 'firstName lastName profilePic')
        .sort({ createdAt: -1 }) // Sort by latest created
        .limit(limit);
    return limitedNews;
});
exports.getNews = getNews;
