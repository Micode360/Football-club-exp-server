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
exports.leagueResolver = void 0;
//Service
const leagueService_1 = __importDefault(require("../../services/leagueService"));
exports.leagueResolver = {
    Query: {
        leagues: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return leagueService_1.default.getLeagues(parent, args, context); }),
    },
    Mutation: {
        AddLeague: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return leagueService_1.default.addLeague(parent, input, context); }),
        EditLeague: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return leagueService_1.default.editLeague(parent, input, context); }),
        DeleteLeague: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return leagueService_1.default.deleteLeague(parent, input, context); })
    }
};
