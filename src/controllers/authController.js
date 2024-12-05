import authService from '../services/authService.js';
import logger from '../utils/logger.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { prismaResponse } from '../utils/prismaResponse.js';

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await authService.login(username, password);
      logger.info(`User logged in: ${username}`);
      return successResponse(res, 'Login successful', userData);
    } catch (error) {
      logger.error(`Login error: ${error.message}`);

      if (error.message === 'User not found') {
        return errorResponse(res, 'Username not found.', 401);
      } else if (error.message === 'Invalid credentials') {
        return errorResponse(res, 'Incorrect password.', 401);
      }

      const { message, code } = prismaResponse(error);
      return errorResponse(res, message || 'An unexpected error occurred.', code || 500);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      logger.info(`OTP sent to: ${email}`);
      return successResponse(res, 'OTP sent to your email. Please check your inbox.');
    } catch (error) {
      logger.error(`Forgot password error: ${error.message}`);
      return errorResponse(res, error.message || 'An unexpected error occurred.', 400);
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;
      await authService.verifyOTP(email, otp);
      logger.info(`OTP verified for: ${email}`);
      return successResponse(res, 'OTP verified successfully. Please provide a new password.');
    } catch (error) {
      logger.error(`OTP verification error: ${error.message}`);
      return errorResponse(res, error.message || 'An unexpected error occurred.', 400);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      await authService.resetPassword(email, newPassword);
      logger.info(`Password reset for: ${email}`);
      return successResponse(res, 'Password has been reset successfully.');
    } catch (error) {
      logger.error(`Password reset error: ${error.message}`);
      return errorResponse(res, error.message || 'An unexpected error occurred.', 400);
    }
  },

  logout: (req, res) => {
    logger.info('User logged out');
    return successResponse(res, 'Logout successful');
  },
};

export default authController;