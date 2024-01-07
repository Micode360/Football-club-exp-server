//Service
import UserService from "../../services/userService";

//Types
import { userProperties, deleteProps } from "../../utils/types/resolver";


export const userResolver = {
    Query: {
        user: async (parent:any, args:any, context:any) => await UserService.getUser(parent, args, context),
        users: async (parent:any, args:any, context:any) => await UserService.getUsers(parent, args, context),
    },
    Mutation: {
        UpdateUser: async (parent:any, { input }:{ input: userProperties }, context:any) => UserService.updateUser(parent, input, context),
        DeleteUser: async (parent:any, { input }:{ input: deleteProps }, context:any) => UserService.deleteUser(parent, input, context),
      }
} 


