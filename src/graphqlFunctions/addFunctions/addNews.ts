import { News } from '../../models/news'
import base from '../../db/base'
import { newsProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
import { User } from '../../models/user'
import { updateNotification } from '../updateFunctions/updateNotification'
base()

export const addNews = async (parent: any, input: newsProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const { authorIds, title, coverImage, description, author, league, categories, content } = input

  const user = await User.findOne({ _id: authorIds[0] })
  const superAdmin = await User.findOne({ role: 'Super Admin' })

  if (!user || !superAdmin) {
    return response(false, 404, 'User or Super Admin not found');
  }

  let news: any = {
    authorIds,
    title,
    coverImage,
    description,
    author,
    league,
    categories,
    content,
  }
  if (user.role === 'Super Admin') news.status = 'published'

  try {
    const newNews = new News(news)

    await newNews.save()

    if (user.role !== 'Super Admin') {
      await updateNotification(
        parent,
        {
          sender: user._id,
          type: 'request',
          description: 'has created a news ready to be published. Waiting for your approval.',
          action: `/news/${newNews._id}`,
          recipient: superAdmin._id,
        },
        context
      );
    }


    return {
      success: true,
      status: 200,
      message: 'News Added',
      value: newNews?._id,
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
