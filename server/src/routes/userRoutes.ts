import express from 'express';
import UserController from '../controllers/UserControllers';
const routes =  express.Router();

routes.post('/user', UserController.confirmLogin);
routes.get('/user/:token', UserController.confirmUser);

export default routes;