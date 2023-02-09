import express from 'express';
import UserController from '../controllers/UserControllers';
const routes =  express.Router();

routes.post('/users', UserController.confirmLogin);
routes.get('/users/:token', UserController.confirmUser);

export default routes;