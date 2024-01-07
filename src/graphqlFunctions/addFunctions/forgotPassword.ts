import { User } from "../../models/user";
import base from "../../db/base";
import { response } from "../../utils/response";
import { authenticator, totp, hotp } from "otplib";
import { uuid } from "uuidv4";
import { harsh } from "../../utils/utilsFunction";
import { mailer } from "../../utils/mailer";
base();

export const forgotPassword = async (parent: any, input: any) => {
  const id = uuid();
  const { email, otp, value } = input;
  const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
  const token = totp.generate(secret);

  try {
    const user =
      (await User.findOne({ email })) ||
      (await User.findOne({ confirmPasswordToken: value }));

    if (!user)
      return response(false, 401, "Email not associated with an account");
    const isValid = totp.verify({ token, secret });
    if (!otp) {

      if (isValid) {
        const my_otp = totp.generate(secret);
        console.log(my_otp, "otp");
        // /* SMTP Logic Below */

        // await mailer(
        //   "The League: Confirm Your Account",{
        //   to: "abayemiracle@gmail.com",
        //   subject: "Confirm Your Account",
        //   text: "Testing this account"
        // });

        /* SMTP Logic Above */

        user.otp = harsh(my_otp);
        user.confirmPasswordToken = id;
        await user.save();
        return { success: true, status: 200, message: "otp sent", value: id };
      }else return { success: false, status: 400, message: "otp expired. Resend" };
 
    } else {
      const token = user.confirmPasswordToken;
      const compare = user.otp === harsh(otp);
      if (compare) {
        return {
          success: true,
          status: 200,
          message: "verified",
          value: token,
        };
      }else return { success: false, status: 400, message: "otp value incorrect" };
    }
  } catch (err: any) {
    console.error(err);
    return response(false, 400, "Internal Server Error");
  }
};
