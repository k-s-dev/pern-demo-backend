import { Router } from "express";
import { workspaceRouter } from "./workspace/routes.js";
import { isAuthenticated } from "../../../lib/middleware/auth.js";
import { tagRouter } from "./tag/routes.js";
import { priorityRouter } from "./priority/routes.js";
import { statusRouter } from "./status/routes.js";
import { categoryRouter } from "./category/routes.js";
import { taskRouter } from "./task/routes.js";

// path: "/pernDemo/api/v1/org"
export const orgRouter = Router({ mergeParams: true });

orgRouter.use(isAuthenticated);

orgRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:pernDemo:api:v1:org.");
});

orgRouter.use("/workspace", workspaceRouter);
orgRouter.use("/tag", tagRouter);
orgRouter.use("/priority", priorityRouter);
orgRouter.use("/status", statusRouter);
orgRouter.use("/category", categoryRouter);
orgRouter.use("/task", taskRouter);
