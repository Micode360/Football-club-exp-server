import { pubsub } from "../resolver";



export const userSubscription = () => {
    return pubsub.asyncIterator(['USER_UPDATED']);
};

export const responseSubscription = () => {
    return pubsub.asyncIterator(['RESPONSE']);
};