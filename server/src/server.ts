import express from 'express';
import cors from 'cors';
import './config/dbConfig'; // Config is executed
import routes from './routes/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);