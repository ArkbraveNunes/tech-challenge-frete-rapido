import * as proc from 'process';
import * as winston from 'winston';

import { env } from '@common/env';
import { Logger } from './logger.interface';

export class LoggerService implements Logger {
  _winstonConfig: winston.LoggerOptions;

  constructor(context: string) {
    this._winstonConfig = {
      defaultMeta: {
        appName: env.appName,
        appVersion: env.appVersion,
        pid: proc.pid,
        context,
        time: new Date(),
      },
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [new winston.transports.Console()],
    };
  }

  logMessage(): winston.Logger {
    return winston.createLogger(this._winstonConfig);
  }

  debug(msg: string): void {
    this.logMessage().debug(msg);
  }

  info(msg: string): void {
    this.logMessage().info(msg);
  }

  warn(msg: string): void {
    this.logMessage().warn(msg);
  }

  error(msg: string | Record<string, any>): void {
    this.logMessage().error(
      `Error: ${typeof msg === 'object' ? JSON.stringify(msg) : msg}`,
    );
  }
}
