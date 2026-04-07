import type {
  TPriorityCreateDataIn,
  TPriorityParams,
  TPriorityUpdatePatchDataIn,
  TPriorityUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/priority.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { priorityService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class PriorityController {
  async create(
    req: Request<Request["params"], object, TPriorityCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const priority = await priorityService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(priority));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const priorities = await priorityService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(priorities));
  }

  async getById(
    req: Request<Request["params"] & TPriorityParams>,
    res: TAuthenticatedResponse,
  ) {
    const priority = await priorityService.getById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(priority));
  }

  async updateByIdPatch(
    req: Request<
      Request["params"] & TPriorityParams,
      object,
      TPriorityUpdatePatchDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedPriority = await priorityService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedPriority));
  }

  async updateByIdPut(
    req: Request<
      Request["params"] & TPriorityParams,
      object,
      TPriorityUpdatePutDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedPriority = await priorityService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedPriority));
  }

  async deleteById(
    req: Request<Request["params"] & TPriorityParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedPriority = await priorityService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedPriority));
  }
}

export const priorityController = new PriorityController();
