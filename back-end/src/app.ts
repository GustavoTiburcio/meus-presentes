import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
require('express-async-errors');

import { router } from './routes';

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.replaceAll(' ', '').split(',') : [];

//Create app
export const app = express();

try {
  const uploadDir = path.join(__dirname, 'uploads');

  // Verify if uploadDir exists
  if (!fs.existsSync(uploadDir)) {
    console.log('Creating upload directory...: ' + uploadDir);
    // If it doesn't exist, create it
    fs.mkdirSync(uploadDir);
  }
  console.log('Upload directory created: ' + uploadDir);
} catch {
  console.log('Error creating upload directory...');
}

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
      res.status(403).json({ error: 'Forbidden access from unauthorized sources.' });
    } else {
      next(error);
    }
  } else {
    // Other errors
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
