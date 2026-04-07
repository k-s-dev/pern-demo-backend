import * as v from "valibot";
import { SDbId, SDescription, SName } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const SWorkspaceFieldId = SDbId;
export const SWorkspaceFieldName = SName;
export const SWorkspaceFieldDescription = v.exactOptional(
  v.nullable(SDescription),
  null,
);

export const SWorkspace = v.object({
  id: SWorkspaceFieldId,
  name: SWorkspaceFieldName,
  description: SWorkspaceFieldDescription,
});

export const SWorkspaceParams = v.required(v.pick(SWorkspace, ["id"]));

export const SWorkspaceCreateDataIn = v.required(
  v.pick(SWorkspace, ["name", "description"]),
  ["name"],
);

export const SWorkspaceUpdatePatchDataIn = v.partial(
  v.omit(SWorkspace, ["id"]),
);

export type TWorkspace = v.InferInput<typeof SWorkspace>;
export type TWorkspaceParams = v.InferInput<typeof SWorkspaceParams>;
export type TWorkspaceCreateDataIn = v.InferInput<
  typeof SWorkspaceCreateDataIn
>;
export type TWorkspaceUpdatePutDataIn = TWorkspaceCreateDataIn;
export type TWorkspaceUpdatePatchDataIn = v.InferInput<
  typeof SWorkspaceUpdatePatchDataIn
>;

export const workspaceIncludeAll = {
  categories: {
    include: {
      parent: true,
      children: true,
    },
  },
  statuses: true,
  priorities: true,
};

export type TWorkspaceIncludeAll = Prisma.WorkspaceGetPayload<{
  include: typeof workspaceIncludeAll;
}>;
