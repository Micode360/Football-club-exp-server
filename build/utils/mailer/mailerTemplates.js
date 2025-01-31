"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPMessage = void 0;
const OTPMessage = (otp) => `
<h1 style="color: #111620">Confirm Your Account</h1>
<p>
    One more step to go. Click the button below to verify your account.
</p>
<p style="font-size: 2rem;">
    Use the following one-time password (OTP) to verify your email address: ${otp}
</p>
<br/>
<p>Yours Truly,</p>
<p><strong>Michat Team</strong></p>
`;
exports.OTPMessage = OTPMessage;
