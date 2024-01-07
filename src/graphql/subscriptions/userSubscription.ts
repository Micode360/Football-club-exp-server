import { pubsub } from "../mainResolver";



export const userSubscription = () => {
    return pubsub.asyncIterator(['USER_UPDATED']);
};

export const responseSubscription = () => {
    return pubsub.asyncIterator(['RESPONSE']);
};