import pino from "pino";
import { config } from "../config.js";

const rootDir = process.cwd();

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      level: "error",
      options: { destination: `${rootDir}/server.log` },
    },
    {
      target: config.nodeEnv === "development" ? "pino-pretty" : "pino/file",
      level: config.nodeEnv === "development" ? "debug" : "error",
      options: {
        destination: 1,
        colorize: true,
        singleLine: true,
      },
    },
  ],
});

export const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);
