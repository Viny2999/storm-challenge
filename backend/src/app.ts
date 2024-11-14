import 'reflect-metadata'
import { Routes } from './controllers/v1';
import express, { Request, Response } from 'express';
import { LoggerService } from './services';
import * as dotenv from 'dotenv';
import { connect } from './config/dataSource';
import cors from 'cors';
import { errorHandler } from './middlewares/errorMiddleware';
dotenv.config();

const logger = LoggerService.getLogger();

const app: express.Application = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/v1', Routes);

app.use((req: Request, res: Response) => res.status(404).send());

if (process.env.NODE_ENV !== 'test') {
  connect().then(() => { 
    app.listen(port, () =>
      logger.info(`The Web Server is Listening at http://${host}:${port}`)
    );
  });
}

export const App: express.Application = app;
