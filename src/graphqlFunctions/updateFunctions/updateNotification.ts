import { User } from '../../models/user'
import { Notification } from '../../models/notification'
import base from '../../db/base'
import { uuid } from 'uuidv4'
import { notificationProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
import { notificationMessage } from '../../utils/notificationMessage'
import { pubsub } from '../../graphql/subscriptions/pubsub'
base()

export const updateNotification = async (parent: any, input: notificationProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')
  let messageId = uuid()

  const { sender, type, description, action, recipient } = input

  try {
    const notification = await Notification.findOne({ recipient })
    const senderInfo = await User.findOne({ _id: sender })
    const createdAt = new Date()

    const incomingMessage: any = {
      id: messageId,
      type,
      sender,
      senderProfilePic: senderInfo.profilePic.imgUrl,
      action,
      message: await notificationMessage(type, {
        name: `${senderInfo.firstName} ${senderInfo.lastName}`,
        description,
        action,
      }),
      isRead: false,
      createdAt: new Date(createdAt.toISOString()),
    }

    if (!notification) {
      const newNotification = new Notification({
        recipient: recipient,
        list: [],
      })

      newNotification.list.unshift(incomingMessage)
      await newNotification.save()
    } else {
      notification.list.unshift(incomingMessage)
      await notification.save()
    }

      const channel = `NEW_NOTIFICATION_${recipient}`;
      pubsub.publish(channel, { newNotification: incomingMessage });

    return {
      success: true,
      status: 200,
      message: 'Notification Sent',
    }
  } catch (error: any) {
    return {
      success: false,
      status: 409,
      message: error.message,
    }
  }
}
