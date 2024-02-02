import { User } from '../../models/user'
import { News } from '../../models/news'
import base from '../../db/base'
import { v2 as cloudinary } from 'cloudinary'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/dist/esm/plugin/drainHttpServer'
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

    if (id.arrIds.length > 0) {
      if (!id.arrIds) {
        return { success: false, status: 400, message: 'arrIds is not defined' };
      }
      const deletionPromises = [...id.arrIds].forEach(async ({ id, imgId }: any) => {
        const news = await News.findOne({ _id: id })

        if (
          (user.role !== 'Super Admin' && news.authorIds.includes(user?._id)) ||
          user.role === 'Super Admin'
        ) {
          if (imgId || imgId !== '') {
            cloudinary.uploader.destroy(imgId)
          }
          const deleteModel = await News.findOneAndDelete({ _id: id })

          if (!deleteModel) {
            return { status: 400, message: 'Invalid id' }
          }
        } else {
          return {
            success: false,
            status: 400,
            message: 'You are not authorized to delete this news.',
          }
        }
      })

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
    console.error(error, "error");
    return { success: false, status: 400, message: error.message }
  }
}
