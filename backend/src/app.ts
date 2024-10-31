// src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import { createAuthRouter } from './interfaces/http/routes/auth.routes';
import { errorHandler } from './interfaces/http/middlewares/error.middleware';
import { generalLimiter } from './interfaces/http/middlewares/rate-limit.middleware';


export const createApp = (dependencies: any) => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors(config.cors));
  app.use(express.json());
  app.use((req, res, next) => {
    generalLimiter(req, res, next).catch(next);
  });

  // Routes
  app.use('/api/auth', createAuthRouter(dependencies.authController, dependencies.tokenService));

  // Error handling
  app.use(errorHandler as express.ErrorRequestHandler);


  return app;
};