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
exports.HandleAccess = void 0;
const user_1 = require("../../models/user");
const news_1 = require("../../models/news");
const base_1 = __importDefault(require("../../db/base"));
const mongoose_1 = require("mongoose");
(0, base_1.default)();
const HandleAccess = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized') {
        return {};
    }
    const { type, id, authorId, userId } = input;
    try {
        const author = yield user_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(authorId) });
        const news = yield news_1.News.findOne({ _id: id });
        if (!author) {
            return {
                success: false,
                status: 404,
                message: 'Author not found',
                value: null,
            };
        }
                if (news.authorIds.includes(userId)) {
            return {
                success: false,
                status: 403,
                message: 'Access has already been granted',
            };
        }
        else if ((!news.authorIds.includes(author._id) && author.role === 'Super Admin') ||
            news.authorIds.includes(author._id)) {
            yield news.authorIds.push(userId);
            news.markModified('authorIds');
            yield news.save();
        }
        else {
            return {
                success: false,
                status: 403,
                message: 'You are not authorized to grant access',
            };
        }
        return {
            success: true,
            status: 200,
            message: 'Access granted',
        };
    }
    catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
});
exports.HandleAccess = HandleAccess;
