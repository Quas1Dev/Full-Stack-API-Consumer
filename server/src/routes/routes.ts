import express from 'express';
import ClientController from '../controllers/ClientControllers';
import UserController from '../controllers/UserControllers';
const routes =  express.Router();

routes.post('/add', ClientController.add);
routes.delete('/delete/:id', ClientController.del);
routes.get('/read', ClientController.read);
routes.put('/update/:id', ClientController.update);

routes.post('/confirmLogin', UserController.confirmLogin);
routes.get('/confirmUser/:token', UserController.confirmUser);
export default routes;