"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userDelete_1 = require("../graphqlFunctions/deleteFunctions/userDelete");
const getUser_1 = require("../graphqlFunctions/readFunctions/getUser");
const getUsers_1 = require("../graphqlFunctions/readFunctions/getUsers");
const updateUser_1 = require("../graphqlFunctions/updateFunctions/updateUser");
const transferRole_1 = require("../graphqlFunctions/updateFunctions/transferRole");
const updatePassword_1 = require("../graphqlFunctions/updateFunctions/updatePassword");
const UserService = {
    getUser: (parent, args, context) => {
        return (0, getUser_1.getUser)(parent, args, context);
    },
    getUsers: (parent, args, context) => {
        return (0, getUsers_1.getUsers)(parent, args, context);
    },
    updateUser: (parent, input, context) => {
        return (0, updateUser_1.updateUser)(parent, input, context);
    },
    deleteUser: (parent, input, context) => {
        return (0, userDelete_1.deleteUser)(parent, input, context);
    },
    transferRole: (parent, input, context) => {
        return (0, transferRole_1.transferRole)(parent, input, context);
    },
    updatePassword: (parent, input, context) => {
        return (0, updatePassword_1.updatePassword)(parent, input, context);
    },
};
exports.default = UserService;
