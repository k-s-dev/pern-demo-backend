import { Router } from "express";
import { workspaceController } from "./controllers.js";
import {
  SWorkspaceCreateDataIn,
  SWorkspaceParams,
  SWorkspaceUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/workspace.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: workspace: "/pernDemo/api/v1/org/workspace"
export const workspaceRouter = Router({ mergeParams: true });

// create
workspaceRouter.post(
  "/",
  validateBody(SWorkspaceCreateDataIn),
  workspaceController.create,
);

// read:list
workspaceRouter.get("/list", workspaceController.list);

// validateParams: id, for all id related routes
workspaceRouter.use("/:id", validateParams(SWorkspaceParams));

// read:detail
workspaceRouter.get("/:id", workspaceController.getById);

// update:patch
workspaceRouter.patch(
  "/:id",
  validateBody(SWorkspaceUpdatePatchDataIn),
  workspaceController.updateByIdPatch,
);

// update:put
workspaceRouter.put(
  "/:id",
  validateBody(SWorkspaceCreateDataIn),
  workspaceController.updateByIdPut,
);

// delete
workspaceRouter.delete("/:id", workspaceController.deleteById);
