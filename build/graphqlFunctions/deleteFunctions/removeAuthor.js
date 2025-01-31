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
exports.removeAuthor = void 0;
const user_1 = require("../../models/user");
const news_1 = require("../../models/news");
const base_1 = __importDefault(require("../../db/base"));
(0, base_1.default)();
const removeAuthor = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return {};
    const id = input;
    try {
        const user = yield user_1.User.findOne({ _id: id === null || id === void 0 ? void 0 : id.authorId });
        if (!user)
            return { status: 404, message: 'User not found' };
        // For Singe Deletion
        const news = yield news_1.News.findOne({ _id: id === null || id === void 0 ? void 0 : id.thisId });
        if ((user.role !== 'Super Admin' && news.authorIds.includes(user === null || user === void 0 ? void 0 : user._id)) ||
            user.role === 'Super Admin') {
            const news = yield news_1.News.findOne({ _id: id === null || id === void 0 ? void 0 : id.thisId });
            if (!news) {
                return { status: 400, message: 'Invalid id' };
            }
            const filteredAuthor = news === null || news === void 0 ? void 0 : news.authorIds.filter((authorId) => authorId.toString() !== id.authorId);
            news.authorIds = filteredAuthor;
            news.markModified('authorIds');
            news.save();
        }
        else {
            return {
                success: false,
                status: 400,
                message: 'You are not authorized to remove this author.',
            };
        }
        return { success: true, status: 200, message: 'Author Successfully removed' };
    }
    catch (error) {
        console.error(error, 'error');
        return { success: false, status: 400, message: error.message };
    }
});
exports.removeAuthor = removeAuthor;
