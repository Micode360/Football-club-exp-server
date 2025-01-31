"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    recipient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    list: {
        type: mongoose_1.default.Schema.Types.Array,
        required: false,
    }
}, {
    timestamps: true,
});
exports.Notification = mongoose_1.default.models.Notification || mongoose_1.default.model("Notification", NotificationSchema);
exports.default = exports.Notification;
