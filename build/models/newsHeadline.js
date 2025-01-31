"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsHeadline = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NewsHeadlineSchema = new Schema({
    headlines: {
        type: Array,
        required: false,
        validate: {
            validator: function (arr) {
                return arr.length >= 0 && arr.length <= 5;
            },
            message: (props) => `${props.value} is not an array with a length between 0 and 5!`,
        },
    },
}, {
    timestamps: true,
});
exports.NewsHeadline = mongoose_1.default.models.NewsHeadline || mongoose_1.default.model("NewsHeadline", NewsHeadlineSchema);
