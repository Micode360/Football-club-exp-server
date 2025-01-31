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
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utilsFunction_1 = require("../utils/utilsFunction");
const verifyAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.get("authorization") || "";
    const bearerToken = token.replace("Bearer ", "");
    const refreshToken = ""; //cookies()?.get("refreshtkn")?.value || "";
    let user = null;
    if (!bearerToken)
        return { user: "unauthorized", status: "public", req, res };
    try {
        const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.JWT_SECRET);
        user = decodedToken.id;
        return { status: "authorized", user, req, res };
    }
    catch (error) {
        const newAccessToken = yield (0, utilsFunction_1.regenerateAccessToken)(refreshToken);
        if (newAccessToken !== "unauthorized") {
            let verifiedAccessToken = jsonwebtoken_1.default.verify(newAccessToken, process.env.JWT_SECRET);
            // cookies().set({
            //   name: "asstkn",
            //   value: newAccessToken,
            //   maxAge: 604800,
            //   path: "/",
            // });
            user = verifiedAccessToken.id;
            return { status: "re-authorized", user, req, res };
        }
        else {
            return { user: "unauthorized", status: "public", req, res };
        }
    }
});
exports.verifyAuth = verifyAuth;
