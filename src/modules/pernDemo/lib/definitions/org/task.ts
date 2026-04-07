import * as v from "valibot";
import { SDbId, SDescription, SName, SOptionalDate } from "../index.js";
import type { Prisma } from "../prisma/client.js";

export const STaskFieldId = SDbId;
export const STaskFieldName = SName;
export const STaskFieldDescription = v.exactOptional(
  v.nullable(SDescription),
  null,
);
export const STaskFieldCategoryId = SDbId;
export const STaskFieldParentId = v.exactOptional(v.nullable(SDbId), null);
export const STaskFieldPriorityId = v.exactOptional(v.nullable(SDbId), null);
export const STaskFieldStatusId = v.exactOptional(v.nullable(SDbId), null);
export const STaskFieldTagIds = v.exactOptional(
  v.nullable(v.array(SDbId)),
  null,
);
export const STaskFieldStartDate = SOptionalDate;
export const STaskFieldEndDate = SOptionalDate;
export const STaskFieldEstimatedStartDate = SOptionalDate;
export const STaskFieldEstimatedEndDate = SOptionalDate;
export const STaskFieldIsArchived = v.exactOptional(v.boolean(), false);
export const STaskFieldArchiveOnCompletion = v.exactOptional(
  v.boolean(),
  false,
);

export const STask = v.object({
  id: STaskFieldId,
  title: STaskFieldName,
  description: STaskFieldDescription,
  categoryId: STaskFieldCategoryId,
  parentId: STaskFieldParentId,
  priorityId: STaskFieldPriorityId,
  statusId: STaskFieldStatusId,
  tagIds: STaskFieldTagIds,
  is_archived: STaskFieldIsArchived,
  archive_on_completion: STaskFieldArchiveOnCompletion,
  start_date: STaskFieldStartDate,
  end_date: STaskFieldEndDate,
  estimated_start: STaskFieldEstimatedStartDate,
  estimated_end: STaskFieldEstimatedEndDate,
});

export const STaskParams = v.required(v.pick(STask, ["id"]));

export const STaskCreateDataIn = v.required(v.omit(STask, ["id"]), [
  "title",
  "categoryId",
]);

export const STaskUpdatePatchDataIn = v.partial(v.omit(STask, ["id"]));

export type TTask = v.InferInput<typeof STask>;
export type TTaskParams = v.InferInput<typeof STaskParams>;
export type TTaskCreateDataIn = v.InferInput<typeof STaskCreateDataIn>;
export type TTaskUpdatePutDataIn = TTaskCreateDataIn;
export type TTaskUpdatePatchDataIn = v.InferInput<
  typeof STaskUpdatePatchDataIn
>;

export const taskIncludeAll = {
  parent: true,
  children: true,
  category: {
    include: {
      workspace: true,
    },
  },
  tags: true,
  priority: true,
  status: true,
};

export type TTaskIncludeAll = Prisma.TaskGetPayload<{
  include: typeof taskIncludeAll;
}>;
