import { User } from '../../models/user'
import { News } from '../../models/news'
import base from '../../db/base'
import { v2 as cloudinary } from 'cloudinary'
import { NewsHeadline } from '../../models/newsHeadline'
base()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const deleteNews = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') return {}
  const id = input

  try {
    const user = await User.findOne({ _id: id?.authorId })
    if (!user) return { status: 404, message: 'User not found' }

    //For multiple deletion
    // Multiple deletion section:
    if (id.arrIds.length > 0) {
      if (!id.arrIds) {
        return { success: false, status: 400, message: 'arrIds is not defined' }
      }

      // Replace forEach with a for...of loop to await each deletion
      for (const item of id.arrIds) {
        const { id: newsId, imgId, headLineId } = item
        const news = await News.findOne({ _id: newsId })
        if (!news) {
          return { success: false, status: 400, message: 'Invalid news id' }
        }

        // IMPORTANT: Check that the user is authorized for THIS news item.
        // (Note that user is being fetched by id?.authorId as before.)
        if (
          !(
            (user.role !== 'Super Admin' && news.authorIds.includes(user?._id)) ||
            user.role === 'Super Admin'
          )
        ) {
          return {
            success: false,
            status: 400,
            message: 'You are not authorized to delete this news.',
          }
        }

        // Make sure to destroy the cloudinary image only if there is a valid imgId
        if (imgId && imgId !== '') {
          await cloudinary.uploader.destroy(imgId)
        }

        const deleteModel = await News.findOneAndDelete({ _id: newsId })
        if (!deleteModel) {
          return { status: 400, message: 'Invalid id' }
        }

        // If there is an associated headline news, update it as before.
        if (headLineId) {
          const foundHeadlineNews = await NewsHeadline.findOne({ _id: headLineId })
          if (foundHeadlineNews) {
            foundHeadlineNews.headlines = foundHeadlineNews.headlines.filter(
              (newsItem: any) => newsItem?.id !== newsId,
            )
            foundHeadlineNews.markModified('headlines')
            await foundHeadlineNews.save()
          }
        }
      }

      return { success: true, status: 200, message: 'Multiple News Successfully deleted' }
    } else {
      // For Singe Deletion
      const news = await News.findOne({ _id: id?.thisId })

      if (
        (user.role !== 'Super Admin' && news.authorIds.includes(user?._id)) ||
        user.role === 'Super Admin'
      ) {
        if (!id?.imgId || id?.imgId !== '') {
          cloudinary.uploader.destroy(id?.imgId)
        }
        const deleteModel = await News.findOneAndDelete({ _id: id?.thisId })

        if (!deleteModel) {
          return { status: 400, message: 'Invalid id' }
        }

        //Single Deletion from headline news starts here
        const foundHeadlineNews = await NewsHeadline.findOne({ _id: id?.headLineId })
        const headlines = [...foundHeadlineNews.headlines].filter(
          (news: any) => news?.id !== id.thisId,
        )

        foundHeadlineNews.headlines = headlines
        foundHeadlineNews.markModified('headlines')

        foundHeadlineNews.save()
        //Single Deletion from headlnie news ends here.
      } else {
        return {
          success: false,
          status: 400,
          message: 'You are not authorized to delete this news.',
        }
      }

      return { success: true, status: 200, message: 'News Successfully deleted' }
    }
  } catch (error: any) {
    console.error(error, 'error')
    return { success: false, status: 400, message: error.message }
  }
}
