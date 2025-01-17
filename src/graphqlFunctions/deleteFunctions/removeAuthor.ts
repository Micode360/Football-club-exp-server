import { User } from '../../models/user'
import { News } from '../../models/news'
import base from '../../db/base'
import { v2 as cloudinary } from 'cloudinary'
import { NewsHeadline } from '../../models/newsHeadline'
base()


export const removeAuthor = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') return {}
  const id = input

  try {
    const user = await User.findOne({ _id: id?.authorId })
    if (!user) return { status: 404, message: 'User not found' }

  
      // For Singe Deletion
      const news = await News.findOne({ _id: id?.thisId })

      if (
        (user.role !== 'Super Admin' && news.authorIds.includes(user?._id)) ||
        user.role === 'Super Admin'
      ) {
        const news = await News.findOne({ _id: id?.thisId })

        if (!news) {
          return { status: 400, message: 'Invalid id' }
        }


        const filteredAuthor = news?.authorIds.filter((authorId: any) =>authorId.toString() !== id.authorId)
        news.authorIds = filteredAuthor
        news.markModified('authorIds')

        news.save()

      } else {
        return {
          success: false,
          status: 400,
          message: 'You are not authorized to remove this author.',
        }
      }

      return { success: true, status: 200, message: 'Author Successfully removed' }
    
  } catch (error: any) {
    console.error(error, 'error')
    return { success: false, status: 400, message: error.message }
  }
}
