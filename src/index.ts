import 'module-alias/register';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';

import dotenv from 'dotenv'
dotenv.config()
import "./database/connection";
import routes from './routes';

const PORT = process.env.POST || 8091;

const app = express();
app.use(cors());
app.use(bodyParser.json());
//rotas basicas
app.get('/', (request: Request, response: Response) => {
  response.send('Server UP');
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});