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
// import { HttpStatus } from "http-status-ts";

export const app = express();

// middleware
app.use(pinoHttp({ logger }));

app.use(
  cors({
    // REVIEW
    origin: "http://192.168.1.5:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
// has to be after cors middleware and before parser middleware (express.json)
// app.options("/next-demo/api/auth/{*any}", (_req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.5:3000")
//   res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
//   res.setHeader("Access-Control-Allow-Credentials", "true")
//   return res.status(HttpStatus.NO_CONTENT).json({});
// });
app.all("/next-demo/api/auth/{*any}", toNodeHandler(nextDemoAuth));

app.use(helmet());
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
