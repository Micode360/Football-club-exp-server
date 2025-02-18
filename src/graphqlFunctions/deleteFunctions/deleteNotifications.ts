import { Notification } from '../../models/notification'
import base from '../../db/base'
import { notificationProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const deleteNotifications = async (parent: any, input: notificationProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const { type, recipient, listId } = input;
  try {
    const selectedNotification = await Notification.findOne({ recipient })
    if (type === 'single') {
      const updatedList = await selectedNotification.list.filter((item: any) => item.id !== listId)
      selectedNotification.list = updatedList
      selectedNotification.markModified('list')
    } else if (type === 'all') {
      selectedNotification.list = []
      selectedNotification.markModified('list')
    }

    await selectedNotification.save()

    return {
      success: true,
      status: 200,
      message: type === 'single' ? 'Notification Deleted' : 'Notifications Deleted',
    }
  } catch (error: any) {
    return {
      success: false,
      status: 409,
      message: error.message,
    }
  }
}
