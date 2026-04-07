import { Router } from "express";
import { priorityController } from "./controllers.js";
import {
  SPriorityCreateDataIn,
  SPriorityParams,
  SPriorityUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/priority.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: priority: "/pernDemo/api/v1/org/priority"
export const priorityRouter = Router({ mergeParams: true });

// create
priorityRouter.post(
  "/",
  validateBody(SPriorityCreateDataIn),
  priorityController.create,
);

// read:list
priorityRouter.get("/list", priorityController.list);

// validateParams: id, for all id related routes
priorityRouter.use("/:id", validateParams(SPriorityParams));

// read:detail
priorityRouter.get("/:id", priorityController.getById);

// update:patch
priorityRouter.patch(
  "/:id",
  validateBody(SPriorityUpdatePatchDataIn),
  priorityController.updateByIdPatch,
);

// update:put
priorityRouter.put(
  "/:id",
  validateBody(SPriorityCreateDataIn),
  priorityController.updateByIdPut,
);

// delete
priorityRouter.delete("/:id", priorityController.deleteById);
