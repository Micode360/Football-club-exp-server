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
exports.newsResolver = void 0;
//Service
const newsServices_1 = __importDefault(require("../../services/newsServices"));
//pubsub
const pubsub_1 = require("../subscriptions/pubsub");
exports.newsResolver = {
    Query: {
        news: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.getNews(parent, args, context); }),
        newsHeadlines: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.getNewsHeadlines(parent, args, context); }),
    },
    Mutation: {
        AddNews: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.addNews(parent, input, context); }),
        EditNews: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.editNews(parent, input, context); }),
        DeleteNews: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.deleteNews(parent, input, context); }),
        RemoveAuthor: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.RemoveAuthor(parent, input, context); }),
        HandleAccess: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.HandleAccess(parent, input, context); }),
        UpdateNewsHeadlines: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return newsServices_1.default.updateNewsHeadlines(parent, input, context); }),
    },
    Subscription: {
        newsUpdate: {
            subscribe: (ctx, msg, args) => {
                var _a;
                console.log({
                    args: (_a = args === null || args === void 0 ? void 0 : args.userId) === null || _a === void 0 ? void 0 : _a.id
                }, "from news update resolver");
                return pubsub_1.pubsub.asyncIterator(`NEWS_UPDATE`);
            },
        },
    }
};
