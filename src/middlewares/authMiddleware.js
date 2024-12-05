import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return errorResponse(res, 'No token provided', 401);
  }
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired', 401);
    }
    return errorResponse(res, 'Invalid token', 403);
  }
};

export default authMiddleware;
