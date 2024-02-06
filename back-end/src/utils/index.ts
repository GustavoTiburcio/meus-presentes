import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

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
    host: 'smtp.zoho.com',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_FROM_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_FROM,
    to: emailMessage.receiver,
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

export function generateRandomPassword(): string {
  const prefix = "res";
  const length = 6; // 3 caracteres do prefixo + 6 caracteres aleatórios
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

export async function imageShackUpload(filePath?: string) {
  try {
    if (!filePath) return undefined;

    const apiKey = process.env.IMAGESHACK_API_KEY;

    const formData = new FormData();

    formData.append('fileupload', fs.createReadStream(filePath));
    formData.append('api_key', apiKey);
    formData.append('album', '5D7A9X5A');

    const response = await axios.post('http://api.imageshack.com/v2/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      fs.unlink(filePath, (err) => { });

      return 'https://' + response.data.result.images[0].direct_link;
    }

    return undefined;
  } catch (error) {
    console.error('Failed to upload image: ', error);
  }
}
