import type {
  TStatusCreateDataIn,
  TStatusParams,
  TStatusUpdatePatchDataIn,
  TStatusUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/status.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { statusService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class StatusController {
  async create(
    req: Request<Request["params"], object, TStatusCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const status = await statusService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(status));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const statuses = await statusService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(statuses));
  }

  async getById(
    req: Request<Request["params"] & TStatusParams>,
    res: TAuthenticatedResponse,
  ) {
    const status = await statusService.getById(req.params.id, res.locals.user);

    res.status(HttpStatus.OK).json(prepareApiResponse(status));
  }

  async updateByIdPatch(
    req: Request<
      Request["params"] & TStatusParams,
      object,
      TStatusUpdatePatchDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedStatus = await statusService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedStatus));
  }

  async updateByIdPut(
    req: Request<
      Request["params"] & TStatusParams,
      object,
      TStatusUpdatePutDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedStatus = await statusService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedStatus));
  }

  async deleteById(
    req: Request<Request["params"] & TStatusParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedStatus = await statusService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedStatus));
  }
}

export const statusController = new StatusController();
