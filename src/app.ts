import express from "express";
import cors from "cors";
import { errorHandler } from "./common/middleware/errorHandler.js";
import helmet from "helmet";
import { appRouter } from "./common/routes.js";

const app = express();

// middleware
app.use(cors());
app.use(helmet())
app.use(express.json());

// -- routes
app.use(appRouter);

// -- error handler
// needs to be the last middleware
app.use(errorHandler)

const server = app.listen(3000, "0.0.0.0", () => {
  const addressInfo = server.address();
  console.log(`Server is running on ${JSON.stringify(addressInfo)}`);
});
