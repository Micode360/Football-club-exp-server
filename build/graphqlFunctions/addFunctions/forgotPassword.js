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
exports.forgotPassword = void 0;
const user_1 = require("../../models/user");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
const otplib_1 = require("otplib");
const uuidv4_1 = require("uuidv4");
const utilsFunction_1 = require("../../utils/utilsFunction");
(0, base_1.default)();
const forgotPassword = (parent, input) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuidv4_1.uuid)();
    const { email, otp, value } = input;
    const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
    const token = otplib_1.totp.generate(secret);
    try {
        const user = (yield user_1.User.findOne({ email })) ||
            (yield user_1.User.findOne({ confirmPasswordToken: value }));
        if (!user)
            return (0, response_1.response)(false, 401, "Email not associated with an account");
        const isValid = otplib_1.totp.verify({ token, secret });
        if (!otp) {
            if (isValid) {
                const my_otp = otplib_1.totp.generate(secret);
                console.log(my_otp, "otp");
                // /* SMTP Logic Below */
                // await mailer(
                //   "The League: Confirm Your Account",{
                //   to: "abayemiracle@gmail.com",
                //   subject: "Confirm Your Account",
                //   text: "Testing this account"
                // });
                /* SMTP Logic Above */
                user.otp = (0, utilsFunction_1.harsh)(my_otp);
                user.confirmPasswordToken = id;
                yield user.save();
                return { success: true, status: 200, message: "otp sent", value: id };
            }
            else
                return { success: false, status: 400, message: "otp expired. Resend" };
        }
        else {
            const token = user.confirmPasswordToken;
            const compare = user.otp === (0, utilsFunction_1.harsh)(otp);
            if (compare) {
                return {
                    success: true,
                    status: 200,
                    message: "verified",
                    value: token,
                };
            }
            else
                return { success: false, status: 400, message: "otp value incorrect" };
        }
    }
    catch (err) {
        console.error(err);
        return (0, response_1.response)(false, 400, "Internal Server Error");
    }
});
exports.forgotPassword = forgotPassword;
