import { gql } from "apollo-server-micro";

export const notificationDefs = gql`
type NotifactionAction {
  path: String
}
  type Notification {
    id: String
    type:String
    sender: String!
    senderProfilePic: String
    message:String
    action: NotifactionAction
    isRead: Boolean
    createdAt: String
  }

  type NotificationList {
    recipient: String
    list: [Notification]
  }

  input NotifactionActionInput {
    path: String
  }

  input NotificatonInput {
    recipient: String
    sender: String
    description: String
    action: NotifactionActionInput
    type: String
  }
  
  input notificationProps {
    type: String
    recipient: String
    listId: String
  }


  type Query {
    notifications: NotificationList
  }
  
  type Mutation {
    SendNotification(input: NotificatonInput!): Response
    MarkNotificationAsRead(input: notificationProps!): Response
    DeleteNotification(input: notificationProps!): Response
  }

  type Subscription {
    newNotification: Notification
  }
`;
