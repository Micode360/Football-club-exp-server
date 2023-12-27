import { User } from "../../../models/user";
import bcrypt from "bcryptjs";
import { uuid } from "uuidv4";
import base from "../../../db/base";
import { response } from "../../../utils/response";
base();

export const changePassword = async (parent: any, input: any) => {
  const cpid = uuid();
  const { id, password } = input;

  try {
    const user = await User.findOne({ confirmPasswordToken: id }).select(
      "+password"
    );

    if (!user)
      return response(false, 401, "Email not associated with an account");

    let userPassword = user.password;

    const isMatch = await bcrypt.compare(password, userPassword);

    if (isMatch) {
      return { success: false, status: 400, message: "Previous password used" };
    } else {
      user.confirmPasswordToken = cpid;
      user.password = password;
      await user.save();
    }

    return {
      success: true,
      status: 200,
      message: "new password has been created",
    };
  } catch (err: any) {
    console.error(err);
    return response(false, 401, "Internal Server Error");
  }
};
