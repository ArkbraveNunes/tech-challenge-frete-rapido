import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import helmet from 'helmet';

import { env } from '@common/env';
import { routes } from '@application/routes';
import { LoggerService, ILogger } from '@common/logger';
import { IDatabaseConnection } from '@common/interfaces';
import { MongoConnection } from '@infra/database';

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
    this._app.use('/frete-rapido', routes.init());
  }
}

new Server().init();
