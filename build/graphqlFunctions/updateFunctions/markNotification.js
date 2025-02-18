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
exports.markNotification = void 0;
const notification_1 = require("../../models/notification");
const base_1 = __importDefault(require("../../db/base"));
const response_1 = require("../../utils/response");
(0, base_1.default)();
const markNotification = (parent, input, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user === 'unauthorized')
        return (0, response_1.response)(false, 409, 'unathorized to access');
    const { type, recipient, listId } = input;
    try {
        const selectedNotification = yield notification_1.Notification.findOne({ recipient });
        const updatedList = yield selectedNotification.list.map((item) => {
            if (type === 'all' && !item.isRead) {
                item.isRead = true;
            }
            else if (type === 'single' && item.id === listId) {
                item.isRead = true;
            }
            return item;
        });
        selectedNotification.list = updatedList;
        selectedNotification.markModified('list');
        yield selectedNotification.save();
        return {
            success: true,
            status: 200,
            message: 'Notification Read',
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
exports.markNotification = markNotification;
