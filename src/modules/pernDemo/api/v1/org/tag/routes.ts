import { Router } from "express";
import { tagController } from "./controllers.js";
import {
  STagCreateDataIn,
  STagParams,
  STagUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/tag.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: tag: "/pernDemo/api/v1/org/tag"
export const tagRouter = Router({ mergeParams: true });

// create
tagRouter.post("/", validateBody(STagCreateDataIn), tagController.create);

// read:list
tagRouter.get("/list", tagController.list);

// validateParams: id, for all id related routes
tagRouter.use("/:id", validateParams(STagParams));

// read:detail
tagRouter.get("/:id", tagController.getById);

// update:patch
tagRouter.patch(
  "/:id",
  validateBody(STagUpdatePatchDataIn),
  tagController.updateByIdPatch,
);

// update:put
tagRouter.put(
  "/:id",
  validateBody(STagCreateDataIn),
  tagController.updateByIdPut,
);

// delete
tagRouter.delete("/:id", tagController.deleteById);
