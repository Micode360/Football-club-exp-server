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
exports.deleteNews = void 0;
const user_1 = require("../../models/user");
const news_1 = require("../../models/news");
const base_1 = __importDefault(require("../../db/base"));
const cloudinary_1 = require("cloudinary");
const newsHeadline_1 = require("../../models/newsHeadline");
(0, base_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const deleteNews = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return {};
    const id = input;
    try {
        const user = yield user_1.User.findOne({ _id: id === null || id === void 0 ? void 0 : id.authorId });
        if (!user)
            return { status: 404, message: 'User not found' };
        //For multiple deletion
        if (id.arrIds.length > 0) {
            if (!id.arrIds) {
                return { success: false, status: 400, message: 'arrIds is not defined' };
            }
            const deletionPromises = [...id.arrIds].forEach(({ id, imgId }) => __awaiter(void 0, void 0, void 0, function* () {
                const news = yield news_1.News.findOne({ _id: id });
                if ((user.role !== 'Super Admin' && news.authorIds.includes(user === null || user === void 0 ? void 0 : user._id)) ||
                    user.role === 'Super Admin') {
                    console.log("deletion running");
                    if (imgId || imgId !== '') {
                        cloudinary_1.v2.uploader.destroy(imgId);
                    }
                    const deleteModel = yield news_1.News.findOneAndDelete({ _id: id });
                    if (!deleteModel) {
                        return { status: 400, message: 'Invalid id' };
                    }
                    if (id === null || id === void 0 ? void 0 : id.headLineId) {
                        // Multiple Deletion from headline news starts here
                        const foundHeadlineNews = yield newsHeadline_1.NewsHeadline.findOne({ _id: id === null || id === void 0 ? void 0 : id.headLineId });
                        const headlines = foundHeadlineNews.headlines.filter((news) => (news === null || news === void 0 ? void 0 : news.id) !== id);
                        foundHeadlineNews.headlines = headlines;
                        foundHeadlineNews.markModified('headlines');
                        foundHeadlineNews.save();
                        //Multiple Deletion from headline news ends here.
                    }
                }
                else {
                    return {
                        success: false,
                        status: 400,
                        message: 'You are not authorized to delete this news.',
                    };
                }
            }));
            return { success: true, status: 200, message: 'Multiple News Successfully deleted' };
        }
        else {
            // For Singe Deletion
            const news = yield news_1.News.findOne({ _id: id === null || id === void 0 ? void 0 : id.thisId });
            if ((user.role !== 'Super Admin' && news.authorIds.includes(user === null || user === void 0 ? void 0 : user._id)) ||
                user.role === 'Super Admin') {
                if (!(id === null || id === void 0 ? void 0 : id.imgId) || (id === null || id === void 0 ? void 0 : id.imgId) !== '') {
                    cloudinary_1.v2.uploader.destroy(id === null || id === void 0 ? void 0 : id.imgId);
                }
                const deleteModel = yield news_1.News.findOneAndDelete({ _id: id === null || id === void 0 ? void 0 : id.thisId });
                if (!deleteModel) {
                    return { status: 400, message: 'Invalid id' };
                }
                //Single Deletion from headline news starts here
                const foundHeadlineNews = yield newsHeadline_1.NewsHeadline.findOne({ _id: id === null || id === void 0 ? void 0 : id.headLineId });
                const headlines = [...foundHeadlineNews.headlines].filter((news) => (news === null || news === void 0 ? void 0 : news.id) !== id.thisId);
                foundHeadlineNews.headlines = headlines;
                foundHeadlineNews.markModified('headlines');
                foundHeadlineNews.save();
                //Single Deletion from headlnie news ends here.
            }
            else {
                return {
                    success: false,
                    status: 400,
                    message: 'You are not authorized to delete this news.',
                };
            }
            return { success: true, status: 200, message: 'News Successfully deleted' };
        }
    }
    catch (error) {
        console.error(error, 'error');
        return { success: false, status: 400, message: error.message };
    }
});
exports.deleteNews = deleteNews;
