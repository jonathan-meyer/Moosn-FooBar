import debug from "debug";

export type Logger = debug.Debugger;

export class LoggerFactory {
  static getLogger(name: string): Logger {
    return debug(name);
  }

  static getLoggers(name: string): Logger[] {
    return [debug(name), debug(`${name}:error`)];
  }
}
