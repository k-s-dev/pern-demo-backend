import { Router } from "express";
import { statusController } from "./controllers.js";
import {
  SStatusCreateDataIn,
  SStatusParams,
  SStatusUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/status.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: status: "/pernDemo/api/v1/org/status"
export const statusRouter = Router({ mergeParams: true });

// create
statusRouter.post(
  "/",
  validateBody(SStatusCreateDataIn),
  statusController.create,
);

// read:list
statusRouter.get("/list", statusController.list);

// validateParams: id, for all id related routes
statusRouter.use("/:id", validateParams(SStatusParams));

// read:detail
statusRouter.get("/:id", statusController.getById);

// update:patch
statusRouter.patch(
  "/:id",
  validateBody(SStatusUpdatePatchDataIn),
  statusController.updateByIdPatch,
);

// update:put
statusRouter.put(
  "/:id",
  validateBody(SStatusCreateDataIn),
  statusController.updateByIdPut,
);

// delete
statusRouter.delete("/:id", statusController.deleteById);
