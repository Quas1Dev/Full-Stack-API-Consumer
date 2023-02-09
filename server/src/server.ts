import express from 'express';
import cors from 'cors';
import './config/dbConfig'; // Config is executed
import clientsRoutes from './routes/clientsRoutes';
import usersRoutes from './routes/userRoutes';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(clientsRoutes);
app.use(usersRoutes);

app.listen(process.env.PORT || 3333);