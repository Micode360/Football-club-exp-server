import { NewsHeadline } from '../../models/newsHeadline'
import base from "../../db/base";
base();

export const getNewsHeadlines:any = async (parent: any, args: any, contextValue: any) => {
  if (contextValue.user === "unauthorized") {
    return []
  }

  const getNewsHeadline:any = await NewsHeadline.find();
  return getNewsHeadline[0];
};
