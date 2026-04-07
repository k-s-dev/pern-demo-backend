import pino from "pino";
import { appConfig } from "../config.js";

const rootDir = process.cwd();

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      level: "error",
      options: { destination: `${rootDir}/server.log` },
    },
    {
      target: appConfig.nodeEnv === "development" ? "pino-pretty" : "pino/file",
      level:
        appConfig.nodeEnv === "development"
          ? "debug"
          : appConfig.nodeEnv === "test"
            ? "silent"
            : "error",
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
