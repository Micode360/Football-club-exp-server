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
exports.updateLeague = void 0;
const user_1 = require("../../models/user");
const leagues_1 = require("../../models/leagues");
const base_1 = __importDefault(require("../../db/base"));
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
(0, base_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const updateLeague = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === "unauthorized") {
        return {};
    }
    const { id, userId, name, logo, country, description, website, socials, backgroundGradient } = input;
    try {
        const user = yield user_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
                value: null,
            };
        }
        if (user.role !== "Super Admin") {
            return {
                success: false,
                status: 403,
                message: "You are not authorized to update leagues"
            };
        }
        else {
            const league = yield leagues_1.League.findOne({ _id: id });
            const leagueUpdate = {
                id,
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
            league.set(leagueUpdate);
            yield league.save();
        }
        return {
            success: true,
            status: 200,
            message: "League updated successfully",
        };
    }
    catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
});
exports.updateLeague = updateLeague;
