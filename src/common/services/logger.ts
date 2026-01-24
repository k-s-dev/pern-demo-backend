import pino from "pino";
import { config } from "../config.js";

const rootDir = process.cwd();

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${rootDir}/server.log` },
    },
    {
      target: config.nodeEnv === "development" ? "pino-pretty" : "pino/file",
      options: {
        destination: 1,
        colorize: true,
      },
    },
  ],
});

export const logger = pino(
  {
    level: config.nodeEnv === "development" ? "debug" : "error",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);
