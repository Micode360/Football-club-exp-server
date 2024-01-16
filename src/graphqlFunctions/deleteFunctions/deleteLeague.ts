import { User } from '../../models/user'
import { League } from '../../models/leagues'
import base from '../../db/base'
import { v2 as cloudinary } from 'cloudinary'
base()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const deleteLeague = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') return {}
  const id = input

  try {
    if (!id?.imgId || id?.imgId !== '') {
      cloudinary.uploader.destroy(id?.imgId)
    }

    const user = await User.findOne({ _id: id?.authorId })

    if (!user) return { status: 404, message: 'User not found' }

    if (user.role !== 'Super Admin')
      return { status: 400, message: 'You are not authorized to delete.' }

    const deleteModel = await League.findOneAndDelete({ _id: id?.thisId })

    if (!deleteModel) {
      return { status: 400, message: 'Invalid id' }
    }

    return { success: true, status: 200, message: 'League Successfully deleted' }
  } catch (error: any) {
    return { success: false, status: 400, message: error.message }
  }
}
