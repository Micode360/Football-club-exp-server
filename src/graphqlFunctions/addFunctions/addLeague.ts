import { User } from '../../models/user'
import { League } from '../../models/leagues'
import base from '../../db/base'
import { leagueProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const addLeague = async (parent: any, input: leagueProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const {
    userId,
    name,
    logo,
    country,
    description,
    website,
    socials,
    backgroundGradient
  } = input

  //League object to save in database

  const league = {
    name,
    logo: {
      publicId: logo?.publicId,
      imgUrl: logo?.imgUrl,
    },
    country: {
      imgPath: country?.imgPath,
      value: country?.value,
    },
    description,
    website,
    socials,
    backgroundGradient
  }
  try {
    const user = await User.findOne({ _id: userId })

    if (user.role === 'Super Admin') {
      const newLeague = new League(league)

      await newLeague.save()

      return {
        success: true,
        status: 200,
        message: 'League Added',
        value: newLeague?._id
      }
    } else {
      return response(false, 409, 'Something went wrong')
    }
  } catch (error: any) {
        return {
      success: false,
      status: 409,
      message: error.message,
    }
  }
}
