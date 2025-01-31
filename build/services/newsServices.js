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
Object.defineProperty(exports, "__esModule", { value: true });
const addNews_1 = require("../graphqlFunctions/addFunctions/addNews");
const updateNewsHeadlines_1 = require("../graphqlFunctions/updateFunctions/updateNewsHeadlines");
const deleteNews_1 = require("../graphqlFunctions/deleteFunctions/deleteNews");
const removeAuthor_1 = require("../graphqlFunctions/deleteFunctions/removeAuthor");
const getNews_1 = require("../graphqlFunctions/readFunctions/getNews");
const newsHeadlines_1 = require("../graphqlFunctions/readFunctions/newsHeadlines");
const updateNews_1 = require("../graphqlFunctions/updateFunctions/updateNews");
const handleAccess_1 = require("../graphqlFunctions/updateFunctions/handleAccess");
const NewsService = {
    addNews: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, addNews_1.addNews)(parent, input, context); }),
    getNews: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, getNews_1.getNews)(parent, args, context); }),
    editNews: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, updateNews_1.updateNews)(parent, input, context); }),
    deleteNews: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, deleteNews_1.deleteNews)(parent, input, context); }),
    RemoveAuthor: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, removeAuthor_1.removeAuthor)(parent, input, context); }),
    HandleAccess: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, handleAccess_1.HandleAccess)(parent, input, context); }),
    getNewsHeadlines: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, newsHeadlines_1.getNewsHeadlines)(parent, args, context); }),
    updateNewsHeadlines: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, updateNewsHeadlines_1.updateNewsHeadlines)(parent, input, context); })
};
exports.default = NewsService;
