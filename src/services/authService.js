import bcrypt from 'bcrypt';
import prisma from '../utils/prismaClient.js';
import { generateToken } from '../utils/jwt.js';
import { sendResetEmail } from '../utils/email.js';
import crypto from 'crypto';

const authService = {
  login: async (username, password) => {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) throw new Error('User not found');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error('Invalid credentials');

    const token = generateToken({ userId: user.id });

    return {
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      token,
    };
  },

  generateOTP: () => {
    return crypto.randomInt(100000, 999999).toString();
  },

  forgotPassword: async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('Email not found');

    const otp = authService.generateOTP(); // Perbaikan di sini

    await prisma.passwordReset.create({
      data: {
        email: user.email,
        otp,
        expiresAt: new Date(Date.now() + 300000), // OTP valid for 5 minutes
      },
    });

    await sendResetEmail(user.email, otp);
  },

  verifyOTP: async (email, otp) => {
    const otpEntry = await prisma.passwordReset.findFirst({
      where: {
        email,
        otp,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!otpEntry) throw new Error('Invalid or expired OTP');

    await prisma.passwordReset.delete({ where: { id: otpEntry.id } });
    return true;
  },

  resetPassword: async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  },
};

export default authService;
