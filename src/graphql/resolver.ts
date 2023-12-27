import { getUser } from "./queries/auth/getUser";
import { authorized } from "./queries/authorized/authorizeAccess";
import { createUser } from "./mutation/auth/register";
import { login } from "./mutation/auth/login";
import { forgotPassword } from "./mutation/auth/forgotPassword";
import { changePassword } from "./mutation/auth/changePassword";
import { updateUser } from "./mutation/user/updateUser";
import { userProperties, loginProperties, forgetPasswordProps, changePasswordProps } from "../utils/types/resolver";

// Subscriptions
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        user: async (parent:any, args:any, context:any) => await getUser(parent, args, context),
        authorizedAccess: async (parent:any, args:any, context:any) => await authorized(parent, args, context)
    },
    Mutation: {
        Register: async (parent:any, { input }:{ input: userProperties }) => await createUser(parent, input), 
        Login: async (parent:any, { input }:{ input: loginProperties }, context:any) => await login(parent, input,context),
        ForgotPassword: async (parent:any, { input }:{ input: forgetPasswordProps }) => forgotPassword(parent, input),
        ChangePassword: async (parent:any, { input }:{ input: changePasswordProps }) => changePassword(parent, input),
        UpdateUser: async (parent:any, { input }:{ input: userProperties }) => updateUser(parent, input),
        PostUser: async (parent:any, { input }:{ input: any }) => {
            // pubsub.publish('POST_ADDED', {
            //     name: input.name
            // })
            console.log(input, "input");
                return {
                    success: true,
                    message: "user added"
                }
        }
      },
      Subscription: {
        user: {
            subscribe: () => pubsub.asyncIterator(['POST_ADDED']),
        },
      }
} 


