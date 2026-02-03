import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { toNodeHandler } from "better-auth/node";
import { logger } from "./lib/logger/service.js";
import { appRouter } from "./lib/routes.js";
import { errorHandler } from "./lib/error/errorHandler.js";
import { nextDemoAuth } from "./modules/nextDemo/lib/auth/auth.js";

export const app = express();

// middleware
app.use(pinoHttp({ logger }));

// has to be before parser middleware (express.json)
app.all("/next-demo/api/auth/{*any}", toNodeHandler(nextDemoAuth));

app.use(
  cors({
    // REVIEW
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);
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
