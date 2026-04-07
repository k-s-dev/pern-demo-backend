import type {
  TCategoryCreateDataIn,
  TCategoryParams,
  TCategoryUpdatePatchDataIn,
  TCategoryUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/category.js";
import type { Request } from "express";
import { HttpStatus } from "http-status-ts";
import { categoryService } from "./service.js";
import type { TAuthenticatedResponse } from "#/src/lib/definitions/index.js";
import { prepareApiResponse } from "#/src/lib/utils/response.js";

export class CategoryController {
  async create(
    req: Request<Request["params"], object, TCategoryCreateDataIn>,
    res: TAuthenticatedResponse,
  ) {
    const category = await categoryService.create(req.body, res.locals.user);
    res.status(HttpStatus.CREATED).json(prepareApiResponse(category));
  }

  async list(_req: Request, res: TAuthenticatedResponse) {
    const categories = await categoryService.list(res.locals.user);
    res.status(HttpStatus.OK).json(prepareApiResponse(categories));
  }

  async getById(
    req: Request<Request["params"] & TCategoryParams>,
    res: TAuthenticatedResponse,
  ) {
    const category = await categoryService.getById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(category));
  }

  async updateByIdPatch(
    req: Request<
      Request["params"] & TCategoryParams,
      object,
      TCategoryUpdatePatchDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedCategory = await categoryService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedCategory));
  }

  async updateByIdPut(
    req: Request<
      Request["params"] & TCategoryParams,
      object,
      TCategoryUpdatePutDataIn
    >,
    res: TAuthenticatedResponse,
  ) {
    const updatedCategory = await categoryService.updateById(
      req.params.id,
      res.locals.user,
      req.body,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(updatedCategory));
  }

  async deleteById(
    req: Request<Request["params"] & TCategoryParams>,
    res: TAuthenticatedResponse,
  ) {
    const deletedCategory = await categoryService.deleteById(
      req.params.id,
      res.locals.user,
    );

    res.status(HttpStatus.OK).json(prepareApiResponse(deletedCategory));
  }
}

export const categoryController = new CategoryController();
