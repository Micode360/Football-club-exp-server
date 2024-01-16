import { User } from "../../models/user";
import base from "../../db/base";
import { userProperties } from "../../utils/types/resolver";
import { response } from "../../utils/response";
base();

export const registerUser = async (parent: any, input: userProperties) => {
  const { firstName, lastName, email, password } = input;

  try {
    const user = await User.findOne({ email });
    const checkingRoles = await User.find();
    let role = checkingRoles.some(({role})=>role === "Super Admin");



    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role: role? "Admin": "Super Admin",
        confirmPassword: false,
      });

      await newUser.save();

      return response(true, 200, "Registration successful");
    } else {
      return response(false, 409, "This user is already registered");
    }
  } catch (error: any) {
    throw new Error("Error creating user: " + error.message);
  }
};
