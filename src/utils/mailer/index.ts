import nodemailer from "nodemailer";
import { mailOptionsProps } from "../types/resolver";




export const mailer = (mailTitle:any,options:any) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    // host: 'smtp.zoho.com',
    // port: 465,
    // secure: true, 
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions:mailOptionsProps = { 
    from: {
      name: mailTitle,
      address: process.env.EMAIL_FROM as string,
    },
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)     else   });
};

