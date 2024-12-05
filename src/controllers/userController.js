import userService from '../services/userService.js';
import logger from '../utils/logger.js'; 
import { successResponse, errorResponse } from '../utils/response.js';
import { prismaResponse } from '../utils/prismaResponse.js';

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      logger.info(`User created: ${JSON.stringify(user)}`);
      return successResponse(res, 'User created successfully.', user, 201);
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      const { message, code } = prismaResponse(error);
      return errorResponse(res, message, code);
    }
  },

  getAllUsers: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const usersData = await userService.getAllUsers(Number(page), Number(limit));
      logger.info('Retrieved all users with pagination');
      return successResponse(res, 'All users retrieved successfully.', usersData);
    } catch (error) {
      logger.error(`Error retrieving users: ${error.message}`);
      const { message, code } = prismaResponse(error);
      return errorResponse(res, message, code);
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(Number(id));
      if (!user) {
        logger.warn(`User not found: ${id}`);
        return errorResponse(res, 'User not found.', 404);
      }
      logger.info(`Retrieved user: ${JSON.stringify(user)}`);
      return successResponse(res, 'User retrieved successfully.', user);
    } catch (error) {
      logger.error(`Error retrieving user by ID: ${error.message}`);
      const { message, code } = prismaResponse(error);
      return errorResponse(res, message, code);
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.updateUser(Number(id), req.body);
      logger.info(`Updated user: ${JSON.stringify(user)}`);
      return successResponse(res, 'User updated successfully.', user);
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      const { message, code } = prismaResponse(error);
      return errorResponse(res, message, code);
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await userService.deleteUser(Number(id));
      logger.info(`Deleted user: ${id}`);
      return successResponse(res, 'User deleted successfully.');
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      const { message, code } = prismaResponse(error);
      return errorResponse(res, message, code);
    }
  },
};

export default userController;
