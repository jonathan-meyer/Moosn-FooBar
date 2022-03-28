process.env.DEBUG = "*,-follow-redirects";

import { readFileSync, writeFileSync } from "fs";
import { inspect } from "util";
import { cli } from "./lib/app";
import { LoggerFactory } from "./lib/Log4js";
import { helloWorld } from "./lib/utility";

const [log, error] = LoggerFactory.getLoggers("Moosn-FooBar");

cli(
  async (inFile, outFile) => {
    log({ inFile, outFile });

    if (inFile) {
      log(`Ignoring: ${inFile}`);
    }

    const name = readFileSync(inFile).toString();
    const { data } = await helloWorld(name);

    log(`Writing: ${outFile}`);
    writeFileSync(outFile, JSON.stringify(data, null, 2));

    log(inspect(data, { colors: true, depth: null }));
  },
  {
    arguments: [
      ["in-file", "where to load the input", "required"],
      ["out-file", "where to save the output", "required"],
    ],
    options: [],
  }
);
