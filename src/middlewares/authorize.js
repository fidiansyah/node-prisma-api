import prisma from '../utils/prismaClient.js';

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    // const userId = req.user?.id; // Ambil userId dari request yang sudah terautentikasi
    const userId = 2;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User is not authenticated.'
      });
    }

    try {
      const userRoles = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      if (!userRoles || !userRoles.role) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'User has no assigned role.',
        });
      }

      const userPermissions = userRoles.role.permissions.map(p => p.permission.name);

      const missingPermissions = requiredPermissions.filter(permission => !userPermissions.includes(permission));

      if (missingPermissions.length > 0) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'User lacks required permissions.',
          missingPermissions,
        });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  };
};

export default authorize;
