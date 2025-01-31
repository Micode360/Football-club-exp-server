"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (success, status, message) => {
    return {
        success,
        status,
        message
    };
};
exports.response = response;
