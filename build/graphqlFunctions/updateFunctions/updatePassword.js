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
exports.updatePassword = void 0;
const user_1 = require("../../models/user");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const updatePassword = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized') {
        return {};
    }
    const { id, password, currentPassword } = input;
    try {
        const user = yield user_1.User.findOne({ _id: id }).select('+password');
        if (!user)
            return (0, response_1.response)(false, 401, 'User not identified with an account');
        const isMatch = yield user.compareToMatchPasswords(currentPassword);
        if (!isMatch) {
            return { success: false, status: 400, message: "password does not match" };
        }
        else {
            user.password = password;
            yield user.save();
        }
        return {
            success: true,
            status: 200,
            message: 'new password has been created',
        };
    }
    catch (err) {
        return (0, response_1.response)(false, 401, 'Internal Server Error');
    }
});
exports.updatePassword = updatePassword;
