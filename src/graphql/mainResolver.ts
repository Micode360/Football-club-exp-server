//Queries
import { getUser } from "../graphqlFunctions/readFunctions/getUser";
import { getUsers } from "../graphqlFunctions/readFunctions/getUsers";
import { authorized } from "../graphqlFunctions/readFunctions/authorizeAccess";

//Mutations
import { registerUser } from "../graphqlFunctions/addFunctions/register";
import { login } from "../graphqlFunctions/addFunctions/login";
import { forgotPassword } from "../graphqlFunctions/addFunctions/forgotPassword";
import { changePassword } from "../graphqlFunctions/updateFunctions/changePassword";
import { updateUser } from "../graphqlFunctions/updateFunctions/updateUser";
import { userProperties, loginProperties, forgetPasswordProps, changePasswordProps, deleteProps } from "../utils/types/resolver";

// Subscriptions
import { PubSub } from 'graphql-subscriptions';
import { userSubscription, responseSubscription } from "./subscriptions/userSubscription";
import { deleteUser } from "../graphqlFunctions/deleteFunctions/userDelete";


export const pubsub = new PubSub();

export const mainResolvers = {
    Query: {
        user: async (parent:any, args:any, context:any) => await getUser(parent, args, context),
        users: async (parent:any, args:any, context:any) => await getUsers(parent, args, context),
        authorizedAccess: async (parent:any, args:any, context:any) => await authorized(parent, args, context)
    },
    Mutation: {
        Register: async (parent:any, { input }:{ input: userProperties }) => await registerUser(parent, input), 
        Login: async (parent:any, { input }:{ input: loginProperties }, context:any) => await login(parent, input, context),
        ForgotPassword: async (parent:any, { input }:{ input: forgetPasswordProps }) => forgotPassword(parent, input),
        ChangePassword: async (parent:any, { input }:{ input: changePasswordProps }) => changePassword(parent, input),
        UpdateUser: async (parent:any, { input }:{ input: userProperties }, context:any) => updateUser(parent, input, context),
        DeleteUser: async (parent:any, { input }:{ input: deleteProps }, context:any) => deleteUser(parent, input, context),
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


