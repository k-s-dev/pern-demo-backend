import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  priorityIncludeAll,
  type TPriorityCreateDataIn,
  type TPriorityIncludeAll,
  type TPriorityUpdatePatchDataIn,
  type TPriorityUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/priority.js";
import { priorityAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";

export class PriorityService {
  async create(dataIn: TPriorityCreateDataIn) {
    const isAuthorized = priorityAuthorization.create();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    const priorityCount = await prisma.priority.count({
      where: { workspaceId: dataIn.workspaceId },
    });
    if (priorityCount >= MAX_MODEL_ROWS_PER_USER.priority) {
      throw new ApiValidationError({
        errors: [
          `There can be only ${MAX_MODEL_ROWS_PER_USER.priority} priorities per user.`,
        ],
      });
    }

    const priority = await prisma.priority.create({
      data: dataIn,
      include: priorityIncludeAll,
    });

    return priority;
  }

  async list(sessionUser: TSessionUser) {
    const priorities: TPriorityIncludeAll[] = [];
    const workspaces = await prisma.workspace.findMany({
      where: { createdById: sessionUser.id },
    });

    for (const workspace of workspaces) {
      const workspacePriorties = await prisma.priority.findMany({
        where: {
          workspaceId: workspace.id,
        },
        include: priorityIncludeAll,
      });
      priorities.push(...workspacePriorties);
    }

    const isAuthorized = priorityAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return priorities;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const priority = await prisma.priority.findUniqueOrThrow({
      where: { id },
      include: priorityIncludeAll,
    });

    const isAuthorized = priorityAuthorization.getById(
      priority.workspace.createdById,
      sessionUser,
    );
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return priority;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TPriorityUpdatePatchDataIn | TPriorityUpdatePutDataIn,
  ) {
    let priority = await priorityService.getById(id, sessionUser);

    const isAuthorized = priorityAuthorization.getById(
      priority.workspace.createdById,
      sessionUser,
    );
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    priority = await prisma.priority.update({
      where: { id },
      data: excludeUndefinedKeys(dataIn),
      include: priorityIncludeAll,
    });

    return priority;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    let priority = await priorityService.getById(id, sessionUser);

    const isAuthorized = priorityAuthorization.deleteById(
      priority.workspace.createdById,
      sessionUser,
    );
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    priority = await prisma.priority.delete({
      where: { id },
      include: priorityIncludeAll,
    });

    return priority;
  }
}

export const priorityService = new PriorityService();
