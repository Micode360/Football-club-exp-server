"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSubscription = exports.userSubscription = void 0;
const mainResolver_1 = require("../mainResolver");
const userSubscription = () => {
    return mainResolver_1.pubsub.asyncIterator(['USER_UPDATED']);
};
exports.userSubscription = userSubscription;
const responseSubscription = () => {
    return mainResolver_1.pubsub.asyncIterator(['RESPONSE']);
};
exports.responseSubscription = responseSubscription;
