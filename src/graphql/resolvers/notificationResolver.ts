//Service
import NotificationService from "../../services/notificationService";

//pubsub
import { pubsub } from "../subscriptions/pubsub";

//Types
import { newsProps } from "../../utils/types/resolver";


export const notificationResolver = {
  Query: {
    notifications: async (parent:any, args:any, context:any) => NotificationService.getNotification(parent, args, context),
  },
    Mutation: {
        SendNotification: async (parent:any, { input }:{ input: newsProps }, context:any) => NotificationService.sendNotification(parent, input, context),
        MarkNotificationAsRead: async (parent:any, { input }:{ input: newsProps }, context:any) => NotificationService.markNotification(parent, input, context),
        DeleteNotification: async (parent:any, { input }:{ input: any }, context:any) => NotificationService.deleteNofication(parent, input, context)
  },
  Subscription: {
    newNotification: {
      subscribe: (ctx:any, msg:any, args:any) => {
        console.log({
          args: args?.userId?.id
        }, "from resolver")
        return pubsub.asyncIterator(`NEW_NOTIFICATION_${args?.userId?.id}`);
      },
    },
  },
} 


