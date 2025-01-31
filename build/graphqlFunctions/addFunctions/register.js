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
exports.registerUser = void 0;
const user_1 = require("../../models/user");
const notification_1 = require("../../models/notification");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const registerUser = (parent, input) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = input;
    try {
        const user = yield user_1.User.findOne({ email });
        const checkingRoles = yield user_1.User.find();
        let role = checkingRoles.some(({ role }) => role === "Super Admin");
        if (!user) {
            const newUser = new user_1.User({
                firstName,
                lastName,
                email,
                password,
                role: role ? "Admin" : "Super Admin",
                confirmPassword: false,
            });
            yield newUser.save();
            //Creating new notification
            const newNotification = new notification_1.Notification({
                recipient: newUser._id,
                list: []
            });
            yield newNotification.save();
            return (0, response_1.response)(true, 200, "Registration successful");
        }
        else {
            return (0, response_1.response)(false, 409, "This user is already registered");
        }
    }
    catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
});
exports.registerUser = registerUser;
