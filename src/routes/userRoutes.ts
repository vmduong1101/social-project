import express from 'express';
import userController from '../controllers/userController';
import authenticateToken from '../middleware/authenticate';

const userRoutes = express.Router();

const { getAllUser, createUser ,deleteUser, login } = userController;

//Sign-in
userRoutes.post('/login', login);

userRoutes.get(
    '/users',
    (req, res, next) => authenticateToken({
        role: 'root',
        auth: {req, res, next }
    }),
    getAllUser
);

userRoutes.post(
    '/users',
    (req, res, next) => authenticateToken({
        role: 'root',
        auth: {req, res, next }
    }),
    createUser
);

userRoutes.delete(
    '/users/:id',
    (req, res, next) => authenticateToken({
        role: 'root',
        auth: {req, res, next }
    }),
    deleteUser
);

export default userRoutes;