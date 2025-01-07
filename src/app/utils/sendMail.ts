import nodemailer from 'nodemailer';
import config from '../config';
export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_user_email,
      pass: config.nodemailer_user_pass,
    },
  });
  await transporter.sendMail({
    from: 'jmjubaer3927@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset password of PH University', // Subject line
    text: 'Reset password link', // plain text body
    html, // html body
  });
};
