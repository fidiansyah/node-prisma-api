import prisma from '../utils/prismaClient.js';
import bcrypt from 'bcrypt';

const userService = {
  createUser: async (userData) => {
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    return await prisma.user.create({ data: userData });
  },

  getAllUsers: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
      },
    });
    const totalUsers = await prisma.user.count();

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  },

  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
      },
    });
  },

  updateUser: async (id, userData) => {
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({ where: { id } });
  },
};

export default userService;
