"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateNotification_1 = require("../graphqlFunctions/updateFunctions/updateNotification");
const getNotification_1 = require("../graphqlFunctions/readFunctions/getNotification");
const markNotification_1 = require("../graphqlFunctions/updateFunctions/markNotification");
const deleteNotifications_1 = require("../graphqlFunctions/deleteFunctions/deleteNotifications");
const NotificationService = {
    getNotification: (parent, args, context) => {
        return (0, getNotification_1.getNotification)(parent, args, context);
    },
    sendNotification: (parent, input, context) => {
        return (0, updateNotification_1.updateNotification)(parent, input, context);
    },
    markNotification: (parent, input, context) => {
        return (0, markNotification_1.markNotification)(parent, input, context);
    },
    deleteNofication: (parent, input, context) => {
        return (0, deleteNotifications_1.deleteNotifications)(parent, input, context);
    },
};
exports.default = NotificationService;
