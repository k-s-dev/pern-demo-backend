import { Router } from "express";
import { categoryController } from "./controllers.js";
import {
  SCategoryCreateDataIn,
  SCategoryParams,
  SCategoryUpdatePatchDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/category.js";
import {
  validateBody,
  validateParams,
} from "#/src/lib/middleware/validation.js";

// path: category: "/pernDemo/api/v1/org/category"
export const categoryRouter = Router({ mergeParams: true });

// create
categoryRouter.post(
  "/",
  validateBody(SCategoryCreateDataIn),
  categoryController.create,
);

// read:list
categoryRouter.get("/list", categoryController.list);

// validateParams: id, for all id related routes
categoryRouter.use("/:id", validateParams(SCategoryParams));

// read:detail
categoryRouter.get("/:id", categoryController.getById);

// update:patch
categoryRouter.patch(
  "/:id",
  validateBody(SCategoryUpdatePatchDataIn),
  categoryController.updateByIdPatch,
);

// update:put
categoryRouter.put(
  "/:id",
  validateBody(SCategoryCreateDataIn),
  categoryController.updateByIdPut,
);

// delete
categoryRouter.delete("/:id", categoryController.deleteById);
