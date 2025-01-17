import { User } from '../../models/user'
import { News } from '../../models/news'
import base from '../../db/base'
import { Types } from 'mongoose'
import { newsProps } from '../../utils/types/resolver'
import { pubsub } from '../../graphql/mainResolver'

base()

export const HandleAccess = async (parent: any, input: newsProps, context: any) => {
  if (context.user === 'unauthorized') {
    return {}
  }

  const { type, id, authorId, userId } = input

  try {
    const author = await User.findOne({ _id: new Types.ObjectId(authorId) })
    const news = await News.findOne({ _id: id })

    if (!author) {
      return {
        success: false,
        status: 404,
        message: 'Author not found',
        value: null,
      }
    }

    console.log(news.authorIds.includes(author._id), 'author Id?')

    if (news.authorIds.includes(userId)) {
      return {
        success: false,
        status: 403,
        message: 'Access has already been granted',
      }
    } else if (
      (!news.authorIds.includes(author._id) && author.role === 'Super Admin') ||
      news.authorIds.includes(author._id)
    ) {
      await news.authorIds.push(userId)
      news.markModified('authorIds')
      await news.save()
    } else {
      return {
        success: false,
        status: 403,
        message: 'You are not authorized to grant access',
      }
    }

    return {
      success: true,
      status: 200,
      message: 'Access granted',
    }
  } catch (error: any) {
    throw new Error('Error updating user: ' + error.message)
  }
}
