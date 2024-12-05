import express from 'express'; 
import authMiddleware from '../middlewares/authMiddleware.js'; 
import userController from '../controllers/userController.js'; 
import { validate } from '../middlewares/validate.js'; 
import { userValidation } from '../validations/userValidation.js'; 
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post('/users', authMiddleware, authorize(['CREATE_USER']), userValidation, validate, userController.createUser);
router.put('/users/:id', authMiddleware, authorize(['EDIT_USER']), userValidation, validate, userController.updateUser);
router.delete('/users/:id', authMiddleware, authorize(['DELETE_USER']), userController.deleteUser);
router.get('/users', authMiddleware, authorize(['VIEW_USERS']), userController.getAllUsers);
router.get('/users/:id', authMiddleware, authorize(['VIEW_USER_DETAIL']), userController.getUserById);

export default router;
