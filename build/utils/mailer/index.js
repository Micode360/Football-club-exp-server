"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer = (mailTitle, options) => {
    const transporter = nodemailer_1.default.createTransport({
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
    const mailOptions = {
        from: {
            name: mailTitle,
            address: process.env.EMAIL_FROM,
        },
        to: options.to,
        subject: options.subject,
        html: options.text,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err, "error");
        else
            console.log(info, "message sent");
    });
};
exports.mailer = mailer;
