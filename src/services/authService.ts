import { changePassword } from "../graphqlFunctions/addFunctions/changePassword";
import { forgotPassword } from "../graphqlFunctions/addFunctions/forgotPassword";
import { login } from "../graphqlFunctions/addFunctions/login";
import { registerUser } from "../graphqlFunctions/addFunctions/register";
import { authorized } from "../graphqlFunctions/readFunctions/authorizeAccess";


const AuthService = {
    authorizedAccess: async (parent:any, args:any, context:any) => await authorized(parent, args, context),
    registerUser: async (parent:any, input:any) => registerUser(parent, input),
    login: async (parent:any, input:any, context:any) => login(parent, input, context),
    forgotPassword: async (parent:any, input:any) => forgotPassword(parent, input),
    changePassword: async (parent:any, input:any) => changePassword(parent, input),
}

export default AuthService;
