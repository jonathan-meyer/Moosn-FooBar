process.env.DEBUG = "*,-follow-redirects";

import { writeFileSync } from "fs";
import { inspect } from "util";
import { cli } from "./lib/app";
import { LoggerFactory } from "./lib/Log4js";
import { helloWorld } from "./lib/utility";

const [log, error] = LoggerFactory.getLoggers("Moosn-FooBar");

cli(
  async (inFile, outFile, { verbose, name }) => {
    log({ inFile, outFile });
    log({ verbose, name });

    if (inFile) {
      log(`Ignoring: ${inFile}`);
    }

    const { data } = await helloWorld(name || "Fred Flintstone");

    log(`Writing: ${outFile}`);
    writeFileSync(outFile, JSON.stringify(data, null, 2));

    if (verbose) {
      log(inspect(data, { colors: true, depth: null }));
    }
  },
  {
    arguments: [
      ["in-file", "where to load the input", "required"],
      ["out-file", "where to save the output", "required"],
    ],
    options: [
      ["n", "name", "your name", "single"],
      ["v", "verbose", "display lots of data", "flag"],
    ],
  }
);
