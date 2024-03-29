import mongoose from 'mongoose';

import { env } from '@common/env';
import { IDatabaseConnection } from '@common/interfaces';
import { LoggerService, ILogger } from '@common/logger';

export class MongoConnection implements IDatabaseConnection {
  logger: ILogger;

  constructor() {
    this.logger = new LoggerService(MongoConnection.name);
  }

  private getUri(): string {
    return `mongodb${env.database.type}://${env.database.username}:${env.database.password}@${env.database.host}:${env.database.port}/${env.database.database}?authSource=admin`;
  }

  async connect(): Promise<void> {
    try {
      const uri = this.getUri();

      this.logger.info(`Connecting to the database -> ${uri}`);
      await mongoose.connect(uri);
      this.logger.info('Database connected successfully');
    } catch (error: any) {
      this.logger.error({ msg: 'Error connecting to database', error });
    }
  }
}
