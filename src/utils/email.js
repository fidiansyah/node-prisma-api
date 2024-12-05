import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_FROM, 
    to: email,
    subject: 'Password Reset OTP',
    html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
