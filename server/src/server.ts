import express from 'express';
import cors from 'cors';
import './config/dbConfig'; // Config is executed
import clientsRoutes from './routes/clientsRoutes';
import usersRoutes from './routes/userRoutes';
import logger from 'morgan';

const app = express();

// Middlewares *1
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(clientsRoutes);
app.use(usersRoutes);

app.listen(process.env.PORT || 3333);

/* 
  Dev's comments
  1* Middlersare functions that has access to the 
  request and response objects, which are generated
  for each request sent to the server. 
*/