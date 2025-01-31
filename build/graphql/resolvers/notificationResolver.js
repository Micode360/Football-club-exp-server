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
exports.notificationResolver = void 0;
//Service
const notificationService_1 = __importDefault(require("../../services/notificationService"));
//pubsub
const pubsub_1 = require("../subscriptions/pubsub");
exports.notificationResolver = {
    Query: {
        notifications: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () { return notificationService_1.default.getNotification(parent, args, context); }),
    },
    Mutation: {
        SendNotification: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return notificationService_1.default.sendNotification(parent, input, context); }),
        MarkNotificationAsRead: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return notificationService_1.default.markNotification(parent, input, context); }),
        DeleteNotification: (parent, { input }, context) => __awaiter(void 0, void 0, void 0, function* () { return notificationService_1.default.deleteNofication(parent, input, context); })
    },
    Subscription: {
        newNotification: {
            subscribe: (ctx, msg, args) => {
                var _a, _b;
                console.log({
                    args: (_a = args === null || args === void 0 ? void 0 : args.userId) === null || _a === void 0 ? void 0 : _a.id
                }, "from resolver");
                return pubsub_1.pubsub.asyncIterator(`NEW_NOTIFICATION_${(_b = args === null || args === void 0 ? void 0 : args.userId) === null || _b === void 0 ? void 0 : _b.id}`);
            },
        },
    },
};
