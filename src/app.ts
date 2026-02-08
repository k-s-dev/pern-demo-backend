import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { toNodeHandler } from "better-auth/node";
import { logger } from "./lib/logger/service.js";
import { appRouter } from "./lib/routes.js";
import { errorHandler } from "./lib/error/errorHandler.js";
import { nextDemoAuth } from "./modules/nextDemo/lib/auth/auth.js";
import { appConfig } from "./lib/config.js";

export const app = express();

// middleware
app.use(pinoHttp({ logger }));
app.use(helmet());

app.use(
  cors({
    // REVIEW
    origin: "http://192.168.1.5:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// has to be after cors middleware and before parser middleware (express.json)
app.all("/next-demo/api/auth/{*any}", toNodeHandler(nextDemoAuth));

app.use(express.json());

// -- routes
app.use(appRouter);

// -- error handler
// needs to be the last middleware
app.use(errorHandler);

const server = app.listen(appConfig.port, "0.0.0.0", () => {
  const addressInfo = server.address();
  logger.info(`Server is running on ${JSON.stringify(addressInfo)}`);
});
