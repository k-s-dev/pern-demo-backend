import type {
  TTagCreateDataIn,
  TTagParams,
  TTagUpdatePatchDataIn,
  TTagUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/tag.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { tagService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class TagController {
  async create(
    req: Request<Request["params"], object, TTagCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const tag = await tagService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(tag));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const tags = await tagService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(tags));
  }

  async getById(
    req: Request<Request["params"] & TTagParams>,
    res: TAuthenticatedResponse,
  ) {
    const tag = await tagService.getById(req.params.id, res.locals.user);

    res.status(HttpStatus.OK).json(prepareApiResponse(tag));
  }

  async updateByIdPatch(
    req: Request<Request["params"] & TTagParams, object, TTagUpdatePatchDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const updatedTag = await tagService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedTag));
  }

  async updateByIdPut(
    req: Request<Request["params"] & TTagParams, object, TTagUpdatePutDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const updatedTag = await tagService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedTag));
  }

  async deleteById(
    req: Request<Request["params"] & TTagParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedTag = await tagService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedTag));
  }
}

export const tagController = new TagController();
