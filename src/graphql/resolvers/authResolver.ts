//Service
import AuthService from "../../services/authService";

//Types
import { userProperties, loginProperties, forgetPasswordProps, changePasswordProps } from "../../utils/types/resolver";

export const authResolvers = {
    Query: {
        authorizedAccess: async (parent:any, args:any, context:any) => await AuthService.authorizedAccess(parent, args, context)
    },
    Mutation: {
        Register: async (parent:any, { input }:{ input: userProperties }) => await AuthService.registerUser(parent, input), 
        Login: async (parent:any, { input }:{ input: loginProperties }, context:any) => await AuthService.login(parent, input, context),
        ForgotPassword: async (parent:any, { input }:{ input: forgetPasswordProps }) => AuthService.forgotPassword(parent, input),
        ChangePassword: async (parent:any, { input }:{ input: changePasswordProps }) => AuthService.changePassword(parent, input),
      }
} 
