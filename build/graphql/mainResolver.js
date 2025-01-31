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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainResolvers = exports.pubsub = void 0;
//Queries
const getUser_1 = require("../graphqlFunctions/readFunctions/getUser");
const getUsers_1 = require("../graphqlFunctions/readFunctions/getUsers");
const authorizeAccess_1 = require("../graphqlFunctions/readFunctions/authorizeAccess");
//Mutations
const register_1 = require("../graphqlFunctions/addFunctions/register");
const login_1 = require("../graphqlFunctions/addFunctions/login");
const forgotPassword_1 = require("../graphqlFunctions/addFunctions/forgotPassword");
const changePassword_1 = require("../graphqlFunctions/updateFunctions/changePassword");
const updateUser_1 = require("../graphqlFunctions/updateFunctions/updateUser");
// Subscriptions
const graphql_subscriptions_1 = require("graphql-subscriptions");
const userSubscription_1 = require("./subscriptions/userSubscription");
const userDelete_1 = require("../graphqlFunctions/deleteFunctions/userDelete");
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.mainResolvers = {
    Query: {
        user: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, getUser_1.getUser)(parent, args, context); }),
        users: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, getUsers_1.getUsers)(parent, args, context); }),
        authorizedAccess: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, authorizeAccess_1.authorized)(parent, args, context); })
    },
    Mutation: {
        Register: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, register_1.registerUser)(parent, input); }),
        Login: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, login_1.login)(parent, input, context); }),
        ForgotPassword: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return (0, forgotPassword_1.forgotPassword)(parent, input); }),
        ChangePassword: (parent, { input }) => __awaiter(void 0, void 0, void 0, function* () { return (0, changePassword_1.changePassword)(parent, input); }),
        UpdateUser: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, updateUser_1.updateUser)(parent, input, context); }),
        DeleteUser: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return (0, userDelete_1.deleteUser)(parent, input, context); }),
    },
    Subscription: {
        user: {
            subscribe: () => (0, userSubscription_1.userSubscription)(),
        },
        response: {
            subscribe: () => (0, userSubscription_1.responseSubscription)(),
        }
    }
};
