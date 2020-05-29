import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendMail = (emailContents) => {
  try{
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
      }
    }
    const client = nodemailer.createTransport(mailConfig);
    return client.sendMail(emailContents);
  }catch(error){
    console.log(error);
  }
}

export const sendSecretMail = (email, authSecret) => {
  const message = {
    from: process.env.MAIL_EMAIL,
    to: email,
    subject: "이메일 인증 요청 메일입니다.",
    html: `환영합니다. 로그인을 위한 인증번호는 <strong>${authSecret}</strong>입니다 .<br/>어플리케이션이나 웹에서 로그인을 위해 이 인증번호를 입력하세요.`
  }
  return sendMail(message);
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);