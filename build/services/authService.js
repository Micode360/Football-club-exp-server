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
const changePassword_1 = require("../graphqlFunctions/updateFunctions/changePassword");
const forgotPassword_1 = require("../graphqlFunctions/addFunctions/forgotPassword");
const login_1 = require("../graphqlFunctions/addFunctions/login");
const register_1 = require("../graphqlFunctions/addFunctions/register");
const authorizeAccess_1 = require("../graphqlFunctions/readFunctions/authorizeAccess");
const AuthService = {
    authorizedAccess: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, authorizeAccess_1.authorized)(parent, args, context); }),
    registerUser: (parent, input) => __awaiter(void 0, void 0, void 0, function* () { return (0, register_1.registerUser)(parent, input); }),
    login: (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, login_1.login)(parent, input, context); }),
    forgotPassword: (parent, input) => __awaiter(void 0, void 0, void 0, function* () { return (0, forgotPassword_1.forgotPassword)(parent, input); }),
    changePassword: (parent, input) => __awaiter(void 0, void 0, void 0, function* () { return (0, changePassword_1.changePassword)(parent, input); }),
};
exports.default = AuthService;
