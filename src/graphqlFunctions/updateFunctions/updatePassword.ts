import { User } from '../../models/user'
import bcrypt from 'bcryptjs'
import { uuid } from 'uuidv4'
import base from '../../db/base'
import { response } from '../../utils/response'
base()

export const updatePassword = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') {
    return {}
  }

  const { id, password, currentPassword } = input;

  try {
    const user = await User.findOne({ _id: id }).select('+password')

    if (!user) return response(false, 401, 'User not identified with an account')

    const isMatch = await user.compareToMatchPasswords(currentPassword);

    if (!isMatch) {
      return { success: false, status: 400, message: "password does not match" };
    }else {
      user.password = password
      await user.save()
    }
    return {
      success: true,
      status: 200,
      message: 'new password has been created',
    }
  } catch (err: any) {
    return response(false, 401, 'Internal Server Error')
  }
}
