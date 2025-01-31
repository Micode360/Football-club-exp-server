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
exports.authResolvers = void 0;
//Service
const authService_1 = __importDefault(require("../../services/authService"));
exports.authResolvers = {
    Query: {
        authorizedAccess: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield authService_1.default.authorizedAccess(parent, args, context); })
    },
    Mutation: {
        Register: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return yield authService_1.default.registerUser(parent, input); }),
        Login: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield authService_1.default.login(parent, input, context); }),
        ForgotPassword: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return authService_1.default.forgotPassword(parent, input); }),
        ChangePassword: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return authService_1.default.changePassword(parent, input); }),
    }
};
