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
exports.userResolver = void 0;
//Service
const userService_1 = __importDefault(require("../../services/userService"));
exports.userResolver = {
    Query: {
        user: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield userService_1.default.getUser(parent, args, context); }),
        users: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield userService_1.default.getUsers(parent, args, context); }),
    },
    Mutation: {
        UpdateUser: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return userService_1.default.updateUser(parent, input, context); }),
        DeleteUser: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return userService_1.default.deleteUser(parent, input, context); }),
        TransferRole: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return userService_1.default.transferRole(parent, input, context); }),
        UpdatePassword: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return userService_1.default.updatePassword(parent, input, context); }),
    }
};
