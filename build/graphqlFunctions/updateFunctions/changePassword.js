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
exports.changePassword = void 0;
const user_1 = require("../../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuidv4_1 = require("uuidv4");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const changePassword = (parent, input) => __awaiter(void 0, void 0, void 0, function* () {
    const cpid = (0, uuidv4_1.uuid)();
    const { id, password } = input;
    try {
        const user = yield user_1.User.findOne({ confirmPasswordToken: id }).select("+password");
        if (!user)
            return (0, response_1.response)(false, 401, "Email not associated with an account");
        let userPassword = user.password;
        const isMatch = yield bcryptjs_1.default.compare(password, userPassword);
        if (isMatch) {
            return { success: false, status: 400, message: "Previous password used" };
        }
        else {
            user.confirmPasswordToken = cpid;
            user.password = password;
            yield user.save();
        }
        return {
            success: true,
            status: 200,
            message: "new password has been created",
        };
    }
    catch (err) {
        return (0, response_1.response)(false, 401, "Internal Server Error");
    }
});
exports.changePassword = changePassword;
