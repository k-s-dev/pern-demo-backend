import { Router } from "express";
import { taskController } from "./controllers.js";
import {
  STaskCreateDataIn,
  STaskParams,
  STaskUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/task.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: task: "/pernDemo/api/v1/org/task"
export const taskRouter = Router({ mergeParams: true });

// create
taskRouter.post("/", validateBody(STaskCreateDataIn), taskController.create);

// read:list
taskRouter.get("/list", taskController.list);

// validateParams: id, for all id related routes
taskRouter.use("/:id", validateParams(STaskParams));

// read:detail
taskRouter.get("/:id", taskController.getById);

// update:patch
taskRouter.patch(
  "/:id",
  validateBody(STaskUpdatePatchDataIn),
  taskController.updateByIdPatch,
);

// update:put
taskRouter.put(
  "/:id",
  validateBody(STaskCreateDataIn),
  taskController.updateByIdPut,
);

// delete
taskRouter.delete("/:id", taskController.deleteById);
