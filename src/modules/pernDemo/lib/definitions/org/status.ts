import * as v from "valibot";
import { SDbId, SName } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const SStatusFieldId = SDbId;
export const SStatusFieldName = SName;
export const SStatusFieldWorkspaceId = SDbId;

export const SStatusFieldCode = v.pipe(
  v.string("Code must be a string."),
  v.nonEmpty("Code cannot be empty!"),
);

export const SStatusFieldGroup = v.pipe(
  v.number("Group must be a positive number."),
  v.integer("Group must be a positive number."),
);

export const SStatusFieldOrder = v.pipe(
  v.number("Order must be a positive number."),
  v.integer("Order must be a positive number."),
);

export const SStatus = v.partial(
  v.object({
    id: SStatusFieldId,
    name: SStatusFieldName,
    code: SStatusFieldCode,
    group: SStatusFieldGroup,
    order: SStatusFieldOrder,
    workspaceId: SStatusFieldWorkspaceId,
  }),
);

export const SStatusParams = v.required(v.pick(SStatus, ["id"]));

export const SStatusCreateDataIn = v.required(v.omit(SStatus, ["id"]));

export const SStatusUpdatePatchDataIn = v.partial(v.omit(SStatus, ["id"]));

export type TStatus = v.InferInput<typeof SStatus>;
export type TStatusParams = v.InferInput<typeof SStatusParams>;
export type TStatusCreateDataIn = v.InferInput<typeof SStatusCreateDataIn>;
export type TStatusUpdatePutDataIn = TStatusCreateDataIn;
export type TStatusUpdatePatchDataIn = v.InferInput<
  typeof SStatusUpdatePatchDataIn
>;

export const statusIncludeAll = {
  workspace: true,
};

export type TStatusIncludeAll = Prisma.StatusGetPayload<{
  include: typeof statusIncludeAll;
}>;
