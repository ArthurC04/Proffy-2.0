import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import routes from './routes';
import AppError from './Errors/AppError';

import './database';

import uploadConfig from './config/upload';

const app = express();

app.use('/files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(3333, () => {
  console.log('App listening on port 3333🚀');
});
