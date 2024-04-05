import { updateNotification } from "../graphqlFunctions/updateFunctions/updateNotification";
import { getNotification } from "../graphqlFunctions/readFunctions/getNotification";
import { markNotification } from "../graphqlFunctions/updateFunctions/markNotification";
import { deleteNotifications } from "../graphqlFunctions/deleteFunctions/deleteNotifications";


const NotificationService = {
  getNotification: (parent: any, args: any, context: any) => {
    return getNotification(parent, args, context);
  },
  sendNotification: (parent: any, input: any, context: any) => {
    return updateNotification(parent, input, context);
  },
  markNotification: (parent: any, input: any, context: any) => {
    return markNotification(parent, input, context);
  },
  deleteNofication: (parent: any, input: any, context: any) => {
    return deleteNotifications(parent, input, context);
  },
 
}

export default NotificationService;
