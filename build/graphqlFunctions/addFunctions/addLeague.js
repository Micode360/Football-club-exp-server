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
exports.addLeague = void 0;
const user_1 = require("../../models/user");
const leagues_1 = require("../../models/leagues");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const addLeague = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return (0, response_1.response)(false, 409, 'unathorized to access');
    const { userId, name, logo, country, description, website, socials, backgroundGradient } = input;
    //League object to save in database
    const league = {
        name,
        logo: {
            publicId: logo === null || logo === void 0 ? void 0 : logo.publicId,
            imgUrl: logo === null || logo === void 0 ? void 0 : logo.imgUrl,
        },
        country: {
            imgPath: country === null || country === void 0 ? void 0 : country.imgPath,
            value: country === null || country === void 0 ? void 0 : country.value,
        },
        description,
        website,
        socials,
        backgroundGradient
    };
    try {
        const user = yield user_1.User.findOne({ _id: userId });
        if (user.role === 'Super Admin') {
            const newLeague = new leagues_1.League(league);
            yield newLeague.save();
            return {
                success: true,
                status: 200,
                message: 'League Added',
                value: newLeague === null || newLeague === void 0 ? void 0 : newLeague._id
            };
        }
        else {
            return (0, response_1.response)(false, 409, 'Something went wrong');
        }
    }
    catch (error) {
                return {
            success: false,
            status: 409,
            message: error.message,
        };
    }
});
exports.addLeague = addLeague;
