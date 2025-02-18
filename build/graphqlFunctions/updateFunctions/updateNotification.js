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
exports.updateNotification = void 0;
const user_1 = require("../../models/user");
const notification_1 = require("../../models/notification");
const base_1 = __importDefault(require("../../db/base"));
const uuidv4_1 = require("uuidv4");
const response_1 = require("../../utils/response");
const notificationMessage_1 = require("../../utils/notificationMessage");
const pubsub_1 = require("../../graphql/subscriptions/pubsub");
(0, base_1.default)();
const updateNotification = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return (0, response_1.response)(false, 409, 'unathorized to access');
    let messageId = (0, uuidv4_1.uuid)();
    const { sender, type, description, action, recipient } = input;
    try {
        const notification = yield notification_1.Notification.findOne({ recipient });
        const senderInfo = yield user_1.User.findOne({ _id: sender });
        const createdAt = new Date();
        const incomingMessage = {
            id: messageId,
            type,
            sender,
            senderProfilePic: senderInfo.profilePic.imgUrl,
            action,
            message: yield (0, notificationMessage_1.notificationMessage)(type, {
                name: `${senderInfo.firstName} ${senderInfo.lastName}`,
                description,
                action,
            }),
            isRead: false,
            createdAt: new Date(createdAt.toISOString()),
        };
        if (!notification) {
            const newNotification = new notification_1.Notification({
                recipient: recipient,
                list: [],
            });
            newNotification.list.unshift(incomingMessage);
            yield newNotification.save();
        }
        else {
            notification.list.unshift(incomingMessage);
            yield notification.save();
        }
        const channel = `NEW_NOTIFICATION_${recipient}`;
        pubsub_1.pubsub.publish(channel, { newNotification: incomingMessage });
        return {
            success: true,
            status: 200,
            message: 'Notification Sent',
        };
    }
    catch (error) {
                return {
            success: false,
            status: 409,
            message: error.message,
        };
    }
});
exports.updateNotification = updateNotification;
