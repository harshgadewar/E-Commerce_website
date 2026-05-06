import nodemailer from "nodemailer";

export default async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification OTP",
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
  });
}
