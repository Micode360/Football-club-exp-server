import { User } from '../../models/user'
import base from '../../db/base'
import { Types } from 'mongoose'
import { userProperties } from '../../utils/types/resolver'
import { v2 as cloudinary } from 'cloudinary'

base()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const transferRole = async (parent: any, input: userProperties, context: any) => {
  if (context.user === 'unauthorized') {
    return {}
  }

  const { id, userId }: any = input

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) })
    const admin = await User.findOne({ _id: new Types.ObjectId(id) })

    if (!user) {
      return {
        success: false,
        status: 404,
        message: 'User not found',
      }
    }

    admin.set({
      role: 'Super Admin',
    })

    user.set({
      role: 'Admin',
    })

    await user.save()
    await admin.save()

    return {
      success: true,
      status: 200,
      message: 'User updated successfully',
      value: 'Updated user data',
    }
  } catch (error: any) {
    throw new Error('Error updating user: ' + error.message)
  }
}
