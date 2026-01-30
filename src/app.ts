import express from "express";
import cors from "cors";
import helmet from "helmet";
import { appRouter } from "./common/routes.js";
import { pinoHttp } from "pino-http";
import { logger } from "./common/logger/service.js";
import { errorHandler } from "./common/error/errorHandler.js";

export const app = express();

// middleware
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(helmet());
app.use(express.json());

// -- routes
app.use(appRouter);

// -- error handler
// needs to be the last middleware
app.use(errorHandler);

const server = app.listen(3000, "0.0.0.0", () => {
  const addressInfo = server.address();
  logger.info(`Server is running on ${JSON.stringify(addressInfo)}`);
});
