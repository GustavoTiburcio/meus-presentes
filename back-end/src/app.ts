import express from 'express';
import cors from 'cors';
import logger from 'morgan';
require('express-async-errors');

import { router } from './routes';


//Cria o app
export const app = express();

//configuração dos middlewares
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use((error: string, request: any, response: any, next: any) => {
  console.log(error);
  response.sendStatus(500);
});

//Integra endpoint na aplicação
app.use('/', router);