import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { Response } from "express";
import * as v from "valibot";

export type ValibotObjectSchema = v.ObjectSchema<
  v.ObjectEntries,
  v.ErrorMessage<v.ObjectIssue> | undefined
>;

export type TAuthenticatedResponse<GBody = object> = Response<
  GBody,
  { user: TSessionUser }
>;
