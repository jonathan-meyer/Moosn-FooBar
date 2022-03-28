import { Command } from "commander";
import { getConfig } from "./config";
import { LoggerFactory } from "./Log4js";

const [log, error] = LoggerFactory.getLoggers("app");

export type Row<T> = T;
export type Table<T> = Row<T>[];

export interface MainFunc<T> {
  (...args): Promise<T>;
}

export type RequiredType = "required";
export type OptionType = "flag" | "single" | "multiple";

/**
 * [short name, long name, description, number of args, is required]
 */
export type Option = [string, string, string, OptionType, RequiredType?];

/**
 * [name, description,is required]
 */
export type Argument = [string, string, RequiredType?];

/**
 *
 * @param cb
 * @returns
 */
export const main = async (cb: MainFunc<void>) => {
  getConfig(process.env.ENV);
  await cb(process.env.ENV);
};

export type Options = {
  options?: Option[];
  arguments?: Argument[];
};

/**
 *
 * @param cb
 * @param options
 */
export const cli = async (cb: MainFunc<void>, options: Options = {}) => {
  const command = new Command().option(
    "-e, --env <environment>",
    "environment to use",
    process.env.ENV || "test"
  );

  (options.options || []).forEach((opt) => {
    const [short, long, desc, count, required] = opt;

    const flags = `-${short}, --${long} ${
      count === "flag"
        ? ""
        : count === "single"
        ? "<value>"
        : count === "multiple"
        ? "<values...>"
        : ""
    }`;

    if (required === "required") {
      command.requiredOption(flags, desc);
    } else {
      command.option(flags, desc);
    }
  });

  (options.arguments || []).forEach(([name, description, required]) => {
    command.argument(
      required === "required" ? `<${name}>` : `[${name}]`,
      description
    );
  });

  command
    .showHelpAfterError()
    .hook("preAction", () => getConfig(command.opts().env))
    .action(cb)
    .parse();
};

export default {};
