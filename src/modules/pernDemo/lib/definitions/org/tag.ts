import * as v from "valibot";
import { SDbId, SDescription, SName } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const STagFieldId = SDbId;
export const STagFieldName = SName;
export const STagFieldDescription = SDescription;

export const STag = v.partial(
  v.object({
    id: STagFieldId,
    name: STagFieldName,
  }),
);

export const STagParams = v.required(v.pick(STag, ["id"]));

export const STagCreateDataIn = v.required(v.pick(STag, ["name"]), ["name"]);

export const STagUpdatePatchDataIn = v.partial(v.pick(STag, ["name"]));

export type TTag = v.InferInput<typeof STag>;
export type TTagParams = v.InferInput<typeof STagParams>;
export type TTagCreateDataIn = v.InferInput<typeof STagCreateDataIn>;
export type TTagUpdatePutDataIn = TTagCreateDataIn;
export type TTagUpdatePatchDataIn = v.InferInput<typeof STagUpdatePatchDataIn>;

export const tagIncludeAll = {
  tasks: {
    include: {
      parent: true,
      children: true,
    },
  },
};

export type TTagIncludeAll = Prisma.TagGetPayload<{
  include: typeof tagIncludeAll;
}>;
