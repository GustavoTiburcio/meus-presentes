import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
require('express-async-errors');

import { router } from './routes';

dotenv.config();

const allowedOrigins = ['https://meuspresentes.vercel.app', 'https://meuspresentes.com.br'];

//Create app
export const app = express();

//Middlewares
app.use(express.json());
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    res.status(400).json({ erro: 'invalid JSON format' });
  } else {
    next();
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  }
}));

// Middleware for CORS errors
app.use((error: any, req: any, res: any, next: any) => {
  if (error instanceof Error) {
    if (error.message === 'The CORS policy for this site does not allow access from the specified Origin.') {
      res.status(403).json({ error: 'Acesso não permitido de origem não autorizada.' });
    } else {
      next(error);
    }
  } else {
    // Outros tipos de erros
    next(error);
  }
});

//Logger
app.use(logger('dev'));

//Global Error handling
app.use((error: string, request: any, response: any, next: any) => {
  console.log(error);
  response.sendStatus(500);
});

//Endpoint redirect
app.use('/', router);