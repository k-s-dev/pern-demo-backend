import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import * as v from "valibot";
import type { ValibotObjectSchema } from "./definitions.js";
import { ApiValidationError } from "../error/definitions.js";

export const validateBody = <GenericBodySchema extends ValibotObjectSchema>(
  schema: GenericBodySchema,
): RequestHandler<
  Request["params"],
  object,
  v.InferOutput<GenericBodySchema>
> => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = v.safeParse(schema, req.body);

    if (!result.success) {
      throw new ApiValidationError({
        path: req.path,
        message: "Validation failed for request body.",
        errors: v.flatten(result.issues),
      });
    }

    req.body = result.output;

    next();
  };
};

export const validateParams = <GenericParamsSchema extends ValibotObjectSchema>(
  schema: GenericParamsSchema,
): RequestHandler<Request["params"] & v.InferOutput<GenericParamsSchema>> => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = v.safeParse(schema, req.params);

    if (!result.success) {
      throw new ApiValidationError({
        path: req.path,
        message: "Validation failed for request params.",
        errors: v.flatten(result.issues),
      });
    }

    (req as Request<v.InferOutput<GenericParamsSchema>>).params = result.output;

    Object.keys(result.output).forEach((k) => {
      if (!Object.keys(req.params).includes(k)) {
        throw new ApiValidationError({
          path: req.path,
          message: "Validation failed for request params.",
        });
      }
    });

    next();
  };
};

export const validatedQuery = <GenericQuerySchema extends ValibotObjectSchema>(
  schema: GenericQuerySchema,
): RequestHandler<
  Request["params"],
  object,
  object,
  Request["query"] & v.InferOutput<GenericQuerySchema>
> => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = v.safeParse(schema, req.query);

    if (!result.success) {
      throw new ApiValidationError({
        path: req.path,
        message: "Validation failed for request query.",
      });
    }

    (
      req as Request<object, object, object, v.InferOutput<GenericQuerySchema>>
    ).query = result.output;

    next();
  };
};
