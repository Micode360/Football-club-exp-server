"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.harsh = exports.generateCookie = exports.regenerateAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const regenerateAccessToken = (refreshToken) => {
    try {
        const verifyToken = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
        const accessToken = (0, exports.generateAccessToken)(verifyToken.id);
        return accessToken;
    }
    catch (error) {
        return "unauthorized";
    }
};
exports.regenerateAccessToken = regenerateAccessToken;
const generateCookie = (name, value) => {
    // cookies().set({
    //   name,
    //   value,
    //   maxAge: 604800,
    //   httpOnly: true,
    //   path: "/",
    // });
};
exports.generateCookie = generateCookie;
const harsh = (value) => crypto_1.default.createHash('sha256').update(value).digest('hex');
exports.harsh = harsh;
const generateRandomString = (length) => {
    return crypto_1.default.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
exports.generateRandomString = generateRandomString;
