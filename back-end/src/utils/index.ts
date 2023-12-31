import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface IEmailMessage {
  receiver: string;
  subject: string;
  body: string;
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidUUIDv4(uuid: string) {
  const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidv4Pattern.test(uuid);
}

export function sendEmail(emailMessage: IEmailMessage) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',                              // the service used
    auth: {
      user: process.env.EMAIL_FROM,              // authentication details of sender, here the details are coming from .env file
      pass: process.env.EMAIL_FROM_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_FROM,                         // sender email address
    to: emailMessage.receiver,   // reciever email address
    subject: emailMessage.subject,
    html: emailMessage.body,
    // attachments: [
    //   {
    //     filename: `${name}.pdf`,
    //     path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
    //     contentType: 'application/pdf',
    //   },
    // ],
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(info); 
  });
}