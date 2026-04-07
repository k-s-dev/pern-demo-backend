import type {
  TWorkspaceCreateDataIn,
  TWorkspaceParams,
  TWorkspaceUpdatePatchDataIn,
  TWorkspaceUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/workspace.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { workspaceService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class WorkspaceController {
  async create(
    req: Request<Request["params"], object, TWorkspaceCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const workspace = await workspaceService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(workspace));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const workspaces = await workspaceService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(workspaces));
  }

  async getById(
    req: Request<Request["params"] & TWorkspaceParams>,
    res: TAuthenticatedResponse,
  ) {
    const workspace = await workspaceService.getById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(workspace));
  }

  async updateByIdPatch(
    req: Request<
      Request["params"] & TWorkspaceParams,
      object,
      TWorkspaceUpdatePatchDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedWorkspace = await workspaceService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedWorkspace));
  }

  async updateByIdPut(
    req: Request<
      Request["params"] & TWorkspaceParams,
      object,
      TWorkspaceUpdatePutDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedWorkspace = await workspaceService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedWorkspace));
  }

  async deleteById(
    req: Request<Request["params"] & TWorkspaceParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedWorkspace = await workspaceService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedWorkspace));
  }
}

export const workspaceController = new WorkspaceController();
