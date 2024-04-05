import { Notification } from "../../models/notification";
import base from "../../db/base";
base();

export const getNotification = async (parent: any, args: any, contextValue: any) => {
    if (contextValue.user === "unauthorized") {
        return []
    }
    
    const notification = await Notification.findOne({ recipient: contextValue.user })
    return notification
};
