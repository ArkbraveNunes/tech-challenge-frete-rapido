import proc from 'process';
import winston from 'winston';

import { env } from '@common/env';
import { ILogger, LoggerErrorInput } from './logger.interface';

export class LoggerService implements ILogger {
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

  error(loggerErrorInput: LoggerErrorInput): void {
    const msg = loggerErrorInput.msg || '';
    const error =
      typeof loggerErrorInput.error === 'object'
        ? JSON.stringify(loggerErrorInput.error)
        : loggerErrorInput.error;

    this.logMessage().error(`${msg} | Error: ${error}`);
  }
}
