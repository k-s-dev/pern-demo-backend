import { validateBody, validateParams } from "@/common/middleware/validator.js";
import { logger } from "@/common/services/logger.js";
import { Router } from "express";
import * as v from "valibot";

export const apiRouter = Router();

apiRouter.get("/", async (_req, res) => {
  res.json("Welcome to express app: API.");
});

const idSchema = v.pipe(v.string(), v.toNumber());
const paramsSchema = v.object(
  {
    id: idSchema,
  },
  "Id is required.",
);
const bodySchema = paramsSchema;

apiRouter.get(
  "/:id",
  validateParams(paramsSchema),
  validateBody(bodySchema),
  (req, res) => {
    logger.info(req.params.id);
    logger.info(req.body.id);
    res.json("Welcome to express app: API.");
  },
);
