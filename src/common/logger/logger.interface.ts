export type LoggerErrorInput = {
  msg?: string;
  error: any;
};

export interface ILogger {
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(loggerErrorInput: LoggerErrorInput): void;
}
