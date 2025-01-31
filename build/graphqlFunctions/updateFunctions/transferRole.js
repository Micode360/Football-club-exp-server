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
exports.transferRole = void 0;
const user_1 = require("../../models/user");
const base_1 = __importDefault(require("../../db/base"));
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
(0, base_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const transferRole = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized') {
        return {};
    }
    const { id, userId } = input;
    try {
        const user = yield user_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        const admin = yield user_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
        if (!user) {
            return {
                success: false,
                status: 404,
                message: 'User not found',
            };
        }
        admin.set({
            role: 'Super Admin',
        });
        user.set({
            role: 'Admin',
        });
        yield user.save();
        yield admin.save();
        return {
            success: true,
            status: 200,
            message: 'User updated successfully',
            value: 'Updated user data',
        };
    }
    catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
});
exports.transferRole = transferRole;
