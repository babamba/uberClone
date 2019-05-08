import Mailgun from "mailgun-js";
import dotenv from "dotenv";
dotenv.config();

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "orochi13@naver.com",
    to: "orochi13@naver.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  console.log("SEND MAIL", fullName);
  const emailSubject = `Hello ~ ${fullName}, please verify your email`;
  const emailBody = `Verify you email by clicking <a href="http://nuber.com/verification/${key}/">here</a>  `;
  return sendEmail(emailSubject, emailBody);
};
