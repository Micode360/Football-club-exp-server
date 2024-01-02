//Queries
import { getUser } from "./queries/auth/getUser";
import { getUsers } from "./queries/auth/getUsers";
import { authorized } from "./queries/authorized/authorizeAccess";

//Mutations
import { createUser } from "./mutation/auth/register";
import { login } from "./mutation/auth/login";
import { forgotPassword } from "./mutation/auth/forgotPassword";
import { changePassword } from "./mutation/auth/changePassword";
import { updateUser } from "./mutation/user/updateUser";
import { userProperties, loginProperties, forgetPasswordProps, changePasswordProps, deleteProps } from "../utils/types/resolver";

// Subscriptions
import { PubSub } from 'graphql-subscriptions';
import { userSubscription, responseSubscription } from "./subscriptions/userSubscription";
import { deleteModel } from "./mutation/delete";


export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        user: async (parent:any, args:any, context:any) => await getUser(parent, args, context),
        users: async (parent:any, args:any, context:any) => await getUsers(parent, args, context),
        authorizedAccess: async (parent:any, args:any, context:any) => await authorized(parent, args, context)
    },
    Mutation: {
        Register: async (parent:any, { input }:{ input: userProperties }) => await createUser(parent, input), 
        Login: async (parent:any, { input }:{ input: loginProperties }, context:any) => await login(parent, input, context),
        ForgotPassword: async (parent:any, { input }:{ input: forgetPasswordProps }) => forgotPassword(parent, input),
        ChangePassword: async (parent:any, { input }:{ input: changePasswordProps }) => changePassword(parent, input),
        UpdateUser: async (parent:any, { input }:{ input: userProperties }) => updateUser(parent, input),
        DeleteUser: async (parent:any, { input }:{ input: deleteProps }, context:any) => deleteModel(parent, input, context),
      },
      Subscription: {
        user: {
            subscribe: () => userSubscription(),
        },
        response: {
            subscribe: () => responseSubscription(),
        }
      }
} 


