import { deleteUser } from '../graphqlFunctions/deleteFunctions/userDelete'
import { getUser } from '../graphqlFunctions/readFunctions/getUser'
import { getUsers } from '../graphqlFunctions/readFunctions/getUsers'
import { updateUser } from '../graphqlFunctions/updateFunctions/updateUser'
import { transferRole } from '../graphqlFunctions/updateFunctions/transferRole'
import { updatePassword } from '../graphqlFunctions/updateFunctions/updatePassword'

const UserService = {
  getUser: (parent: any, args: any, context: any) => {
    return getUser(parent, args, context)
  },
  getUsers: (parent: any, args: any, context: any) => {
    return getUsers(parent, args, context)
  },
  updateUser: (parent: any, input: any, context: any) => {
    return updateUser(parent, input, context);
  },
  deleteUser: (parent: any, input: any, context: any) => {
    return deleteUser(parent, input, context);
  },
  transferRole: (parent: any, input: any, context: any) => {
    return transferRole(parent, input, context);
  },
  updatePassword: (parent: any, input: any, context: any) => {
    return updatePassword(parent, input, context);
  },
}

export default UserService;
