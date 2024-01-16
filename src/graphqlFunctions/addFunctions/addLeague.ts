import { User } from '../../models/user'
import { League } from '../../models/leagues'
import base from '../../db/base'
import { leagueProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const addLeague = async (parent: any, input: leagueProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const {
    id,
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
    id,
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
    const user = await User.findOne({ _id: id })

    if (user.role === 'Super Admin') {
      const newLeague = new League(league)

      await newLeague.save()

      return {
        success: true,
        status: 200,
        message: 'League Added',
      }
    } else {
      return response(false, 409, 'Something went wrong')
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
