import type {
  TTaskCreateDataIn,
  TTaskParams,
  TTaskUpdatePatchDataIn,
  TTaskUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/task.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { taskService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class TaskController {
  async create(
    req: Request<Request["params"], object, TTaskCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const task = await taskService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(task));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const tasks = await taskService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(tasks));
  }

  async getById(
    req: Request<Request["params"] & TTaskParams>,
    res: TAuthenticatedResponse,
  ) {
    const task = await taskService.getById(req.params.id, res.locals.user);

    res.status(HttpStatus.OK).json(prepareApiResponse(task));
  }

  async updateByIdPatch(
    req: Request<
      Request["params"] & TTaskParams,
      object,
      TTaskUpdatePatchDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedTask = await taskService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedTask));
  }

  async updateByIdPut(
    req: Request<Request["params"] & TTaskParams, object, TTaskUpdatePutDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const updatedTask = await taskService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedTask));
  }

  async deleteById(
    req: Request<Request["params"] & TTaskParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedTask = await taskService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedTask));
  }
}

export const taskController = new TaskController();
