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
exports.deleteUser = void 0;
const user_1 = require("../../models/user");
const base_1 = __importDefault(require("../../db/base"));
const cloudinary_1 = require("cloudinary");
(0, base_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const deleteUser = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return {};
    const id = input;
    try {
        if (!(id === null || id === void 0 ? void 0 : id.imgId) || (id === null || id === void 0 ? void 0 : id.imgId) !== '') {
            cloudinary_1.v2.uploader.destroy(id === null || id === void 0 ? void 0 : id.imgId);
        }
        if ((id === null || id === void 0 ? void 0 : id.type) === 'user') {
            const user = yield user_1.User.findOne({ _id: id === null || id === void 0 ? void 0 : id.authorId });
            if (!user)
                return { status: 404, message: 'User not found' };
            if ((id === null || id === void 0 ? void 0 : id.authorId) === (id === null || id === void 0 ? void 0 : id.thisId) && user.role === 'Super Admin')
                return {
                    status: 400,
                    message: 'You are not allowed to delete your account until you transfer your role to another admin.',
                };
            if (user.role !== 'Super Admin' && (id === null || id === void 0 ? void 0 : id.authorId) !== (id === null || id === void 0 ? void 0 : id.thisId))
                return { status: 400, message: 'You are not authorized to delete users' };
        }
        const deleteModel = yield user_1.User.findOneAndDelete({ _id: id === null || id === void 0 ? void 0 : id.thisId });
        if (!deleteModel) {
            return { status: 400, message: 'Invalid id' };
        }
        return { status: 200, message: (id === null || id === void 0 ? void 0 : id.authorId) === (id === null || id === void 0 ? void 0 : id.thisId) ? 'Account deleted' : 'Successfully deleted' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
});
exports.deleteUser = deleteUser;
