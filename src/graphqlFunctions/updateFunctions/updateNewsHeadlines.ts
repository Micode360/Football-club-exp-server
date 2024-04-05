import { User } from '../../models/user'
import { NewsHeadline } from '../../models/newsHeadline'
import base from '../../db/base'
import { leagueProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const updateNewsHeadlines:any = async (parent: any, input: any, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const {
    type,
    userId,
    headlineId,
    headlines
  } = input

 
  try {
    const user = await User.findOne({ _id: userId })

    if (user.role === 'Super Admin') {

      if(headlineId !== "") {
        const foundHeadlineNews = await NewsHeadline.findOne({ _id: headlineId });
        foundHeadlineNews.set({
          headlines
        });

        foundHeadlineNews.save();
      }

      return {
        success: true,
        status: 200,
        message: 'Headline Updated'
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
