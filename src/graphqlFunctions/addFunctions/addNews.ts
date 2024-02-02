import { User } from '../../models/user';
import { News } from '../../models/news';
import base from '../../db/base'
import { newsProps } from '../../utils/types/resolver'
import { response } from '../../utils/response'
base()

export const addNews = async (parent: any, input: newsProps, context: any) => {
  if (context.user === 'unauthorized') return response(false, 409, 'unathorized to access')

  const {
    authorIds,
    userId,
    title,
    coverImage,
    description,
    author,
    league,
    categories, 
    content
  } = input

  //League object to save in database

  const news = {
    authorIds,
    title,
    coverImage,
    description,
    author,
    league,
    categories, 
    content
  }

  console.log(news, "news")
  try {
   const newNews = new News(news)

    await newNews.save()

      return {
        success: true,
        status: 200,
        message: 'News Added',
        value: newNews?._id
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
