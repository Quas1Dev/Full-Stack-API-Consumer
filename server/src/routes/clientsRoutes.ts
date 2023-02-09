import express from 'express';
import ClientController from '../controllers/ClientControllers';
const routes =  express.Router();

routes.post('/clients', ClientController.add);
routes.delete('/clients/:id', ClientController.del);
routes.get('/clients', ClientController.read);
routes.put('/clients/:id', ClientController.update);

export default routes;