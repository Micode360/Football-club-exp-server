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
const addLeague_1 = require("../graphqlFunctions/addFunctions/addLeague");
const deleteLeague_1 = require("../graphqlFunctions/deleteFunctions/deleteLeague");
const getLeagues_1 = require("../graphqlFunctions/readFunctions/getLeagues");
const updateLeague_1 = require("../graphqlFunctions/updateFunctions/updateLeague");
const LeagueService = {
    addLeague: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, addLeague_1.addLeague)(parent, input, context); }),
    getLeagues: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, getLeagues_1.getLeagues)(parent, args, context); }),
    editLeague: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, updateLeague_1.updateLeague)(parent, input, context); }),
    deleteLeague: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, deleteLeague_1.deleteLeague)(parent, input, context); }),
};
exports.default = LeagueService;
