import { config } from "dotenv";
import { LoggerFactory } from "./Log4js";

const log = LoggerFactory.getLogger("config");

config();

export const getConfig = (env: string) => {
  if (env) {
    const env_config = `.env.${env}`;

    log("Loading", env_config);

    config({ path: env_config });
  }
};
