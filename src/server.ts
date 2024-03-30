import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { env } from '@common/env';
import { routes } from '@application/routes';
import { LoggerService, ILogger } from '@common/logger';
import { IDatabaseConnection } from '@common/interfaces';
import { MongoConnection } from '@infra/database';
import swaggerOutput from './docs/swagger.json';

class Server {
  private _logger: ILogger;
  private _app: Express;
  private _mongoDb: IDatabaseConnection;

  constructor() {
    this._logger = new LoggerService(Server.name);
    this._mongoDb = new MongoConnection();
    this._app = express();
  }

  init(): void {
    this.setupDatabases();
    this.setupMiddlewares();
    this.setupDocs();
    this.setupRoutes();

    this._app
      .listen(env.port, () => {
        this._logger.info(`Listening at port ${env.port}`);
      })
      .on('error', (error) => {
        this._logger.error({ msg: `Error listen server`, error });
      });
  }

  private setupMiddlewares(): void {
    this._app.use(compression());
    this._app.use(cors());
    this._app.use(helmet());
    this._app.use(bodyParser.json());
  }

  private setupDatabases(): void {
    this._mongoDb.connect();
  }

  private setupRoutes(): void {
    this._app.use(env.appBasePath, routes.init());
  }

  private setupDocs(): void {
    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  }
}

new Server().init();
