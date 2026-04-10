import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  taskIncludeAll,
  type TTaskCreateDataIn,
  type TTaskUpdatePatchDataIn,
  type TTaskUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/task.js";
import { taskAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";
import { tagService } from "../tag/service.js";
import type { Tag } from "#/src/modules/pernDemo/lib/definitions/prisma/client.js";

export class TaskService {
  async create(dataIn: TTaskCreateDataIn, sessionUser: TSessionUser) {
    const taskCount = await prisma.task.count({
      where: { createdById: sessionUser.id },
    });
    if (taskCount >= MAX_MODEL_ROWS_PER_USER.task) {
      throw new ApiValidationError({
        errors: [
          `There can be only ${MAX_MODEL_ROWS_PER_USER.task} tasks per user.`,
        ],
      });
    }

    type TCreateData = Omit<TTaskCreateDataIn, "tagIds">;
    const createData = Object.fromEntries(
      Object.entries(dataIn).filter(([k]) => {
        return k !== "tagIds";
      }),
    ) as unknown as TCreateData;
    const tags = [] as Tag[];
    if (dataIn.tagIds && dataIn.tagIds?.length > 0) {
      for (const id of dataIn.tagIds) {
        const tag = await tagService.getById(id, sessionUser);
        tags.push(tag);
      }
    }

    const task = await prisma.task.create({
      data: {
        ...createData,
        createdById: sessionUser.id,
        tags: {
          connect: tags,
        },
      },
      include: taskIncludeAll,
    });

    const isAuthorized = taskAuthorization.create(task, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return task;
  }

  async list(sessionUser: TSessionUser) {
    const tasks = await prisma.task.findMany({
      where: {
        createdById: sessionUser.id,
      },
      include: taskIncludeAll,
    });

    const isAuthorized = taskAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tasks;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const task = await prisma.task.findUniqueOrThrow({
      where: { id },
      include: taskIncludeAll,
    });

    const isAuthorized = taskAuthorization.getById(task, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return task;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TTaskUpdatePatchDataIn | TTaskUpdatePutDataIn,
  ) {
    type TUpdateData =
      | Omit<TTaskUpdatePatchDataIn, "tagIds">
      | Omit<TTaskUpdatePutDataIn, "tagIds">;
    const updateData = Object.fromEntries(
      Object.entries(dataIn).filter(([k]) => {
        return k !== "tagIds";
      }),
    ) as unknown as TUpdateData;
    const tags = [] as Tag[];
    if (dataIn.tagIds && dataIn.tagIds?.length > 0) {
      for (const id of dataIn.tagIds) {
        const tag = await tagService.getById(id, sessionUser);
        tags.push(tag);
      }
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...excludeUndefinedKeys(updateData),
        tags: {
          connect: tags,
        },
      },
      include: taskIncludeAll,
    });

    const isAuthorized = taskAuthorization.getById(task, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return task;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    const task = await prisma.task.delete({
      where: { id },
      include: taskIncludeAll,
    });

    const isAuthorized = taskAuthorization.deleteById(task, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return task;
  }
}

export const taskService = new TaskService();
