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
exports.login = void 0;
const user_1 = require("../../models/user");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const login = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = input;
    if (!email || !password) {
        return { status: 400, accessToken: "" };
    }
    try {
        const user = yield user_1.User.findOne({ email }).select("+password");
        if (!user) {
            return { status: 400, accessToken: "User doesn't exist" };
        }
        const isMatch = yield user.compareToMatchPasswords(password);
        if (!isMatch) {
            return { status: 400, accessToken: "password does not match" };
        }
        let token = user.getSignedInToken(context);
        return token;
    }
    catch (error) {
        return (0, response_1.response)(false, 500, error.message);
    }
});
exports.login = login;
