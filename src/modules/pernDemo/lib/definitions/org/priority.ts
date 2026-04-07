import * as v from "valibot";
import { SDbId, SName } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const SPriorityFieldId = SDbId;
export const SPriorityFieldName = SName;
export const SPriorityFieldWorkspaceId = SDbId;

export const SPriorityFieldCode = v.pipe(
  v.string("Code must be a string."),
  v.nonEmpty("Code cannot be empty!"),
);

export const SPriorityFieldGroup = v.pipe(
  v.number("Group must be a positive number."),
  v.integer("Group must be a positive number."),
);

export const SPriorityFieldOrder = v.pipe(
  v.number("Order must be a positive number."),
  v.integer("Order must be a positive number."),
);

export const SPriority = v.partial(
  v.object({
    id: SPriorityFieldId,
    name: SPriorityFieldName,
    code: SPriorityFieldCode,
    group: SPriorityFieldGroup,
    order: SPriorityFieldOrder,
    workspaceId: SPriorityFieldWorkspaceId,
  }),
);

export const SPriorityParams = v.required(v.pick(SPriority, ["id"]));

export const SPriorityCreateDataIn = v.required(v.omit(SPriority, ["id"]));

export const SPriorityUpdatePatchDataIn = v.partial(v.omit(SPriority, ["id"]));

export type TPriority = v.InferInput<typeof SPriority>;
export type TPriorityParams = v.InferInput<typeof SPriorityParams>;
export type TPriorityCreateDataIn = v.InferInput<typeof SPriorityCreateDataIn>;
export type TPriorityUpdatePutDataIn = TPriorityCreateDataIn;
export type TPriorityUpdatePatchDataIn = v.InferInput<
  typeof SPriorityUpdatePatchDataIn
>;

export const priorityIncludeAll = {
  workspace: true,
};

export type TPriorityIncludeAll = Prisma.PriorityGetPayload<{
  include: typeof priorityIncludeAll;
}>;
