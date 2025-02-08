import { User } from '../../models/user'
import base from '../../db/base'
import { v2 as cloudinary } from 'cloudinary'
base()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const deleteUser = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') return {}
  const id = input
  try {
    if (!id?.imgId || id?.imgId !== '') {
      cloudinary.uploader.destroy(id?.imgId)
    }

    if (id?.type === 'user') {
      const user = await User.findOne({ _id: id?.authorId })


      if (!user) return { status: 404, message: 'User not found' }

      if (id?.authorId === id?.thisId && user.role === 'Super Admin')
        return {
          status: 400,
          message:
            'You are not allowed to delete your account until you transfer your role to another admin.',
        }

      if (user.role !== 'Super Admin' && id?.authorId !== id?.thisId)
        return { status: 400, message: 'You are not authorized to delete users' }
    }

    const deleteModel = await User.findOneAndDelete({ _id: id?.thisId })

    if (!deleteModel) {
      return { status: 400, message: 'Invalid id' }
    }

    return { status: 200, message: id?.authorId === id?.thisId? 'Account deleted' : 'Successfully deleted' }
  } catch (error: any) {
    return { status: 400, message: error.message }
  }
}
