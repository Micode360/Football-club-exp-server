import { Notification } from '../../models/notification'
import base from '../../db/base'
import { notificationProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const markNotification = async (parent: any, input: notificationProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const { type, recipient, listId } = input

  try {
    const selectedNotification = await Notification.findOne({ recipient })

    const updatedList = await selectedNotification.list.map((item: any) => {
      if (type === 'all' && !item.isRead) {
        item.isRead = true
      } else if (type === 'single' && item.id === listId) {
        item.isRead = true
      }
      return item
    })

      selectedNotification.list = updatedList
      selectedNotification.markModified('list')


    await selectedNotification.save()

    return {
      success: true,
      status: 200,
      message: 'Notification Read',
    }
  } catch (error: any) {
    console.log('Error: ' + error.message)
    return {
      success: false,
      status: 409,
      message: error.message,
    }
  }
}
