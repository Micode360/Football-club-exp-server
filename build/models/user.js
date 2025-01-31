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
exports.User = void 0;
//import { cookies } from 'next/headers';
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utilsFunction_1 = require("../utils/utilsFunction");
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name required"],
    },
    email: {
        type: String,
        required: [true, "Email Address required"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    role: {
        type: String,
        required: false,
    },
    country: {
        imgPath: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            required: false,
        }
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    profilePic: {
        publicId: {
            type: String,
            required: false,
        },
        imgUrl: {
            type: String,
            required: false,
        }
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minLength: 6,
        select: false,
    },
    verifyUser: Boolean,
    verifyUserToken: String,
    otp: String,
    confirmPassword: Boolean,
    confirmPasswordToken: String
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            next();
        const salt = yield bcryptjs_1.default.genSalt(15);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
UserSchema.methods.compareToMatchPasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
UserSchema.methods.getSignedInToken = function (context) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield (0, utilsFunction_1.generateAccessToken)(this.id);
        const refreshToken = yield (0, utilsFunction_1.generateRefreshToken)(this.id);
        const expiryDate = 7 * 24 * 60 * 60 * 1000;
        context.res.cookie("refreshtkn", refreshToken, {
            httpOnly: true,
            maxAge: expiryDate,
            path: "/",
        });
        const status = 200;
        return { status, accessToken };
    });
};
exports.User = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
