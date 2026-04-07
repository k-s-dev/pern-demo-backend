import * as v from "valibot";
import { SDbId, SDescription, SName } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const SCategoryFieldId = SDbId;
export const SCategoryFieldName = SName;

export const SCategoryFieldDescription = v.exactOptional(
  v.nullable(SDescription),
  null,
);

export const SCategoryFieldWorkspaceId = SDbId;
export const SCategoryFieldParentId = v.exactOptional(v.nullable(SDbId), null);

export const SCategoryFieldOrder = v.exactOptional(
  v.nullable(
    v.pipe(
      v.number("Order must be a positive number."),
      v.integer("Order must be a positive number."),
    ),
    null,
  ),
);

export const SCategory = v.object({
  id: SCategoryFieldId,
  name: SCategoryFieldName,
  description: SCategoryFieldDescription,
  order: SCategoryFieldOrder,
  workspaceId: SCategoryFieldWorkspaceId,
  parentId: SCategoryFieldParentId,
});

export const SCategoryParams = v.required(v.pick(SCategory, ["id"]));

export const SCategoryCreateDataIn = v.omit(SCategory, ["id"]);

export const SCategoryUpdatePatchDataIn = v.partial(v.omit(SCategory, ["id"]));

export type TCategory = v.InferInput<typeof SCategory>;
export type TCategoryParams = v.InferInput<typeof SCategoryParams>;
export type TCategoryCreateDataIn = v.InferInput<typeof SCategoryCreateDataIn>;
export type TCategoryUpdatePutDataIn = TCategoryCreateDataIn;
export type TCategoryUpdatePatchDataIn = v.InferInput<
  typeof SCategoryUpdatePatchDataIn
>;

export const categoryIncludeAll = {
  workspace: true,
  parent: true,
  children: true,
};

export type TCategoryIncludeAll = Prisma.CategoryGetPayload<{
  include: typeof categoryIncludeAll;
}>;
