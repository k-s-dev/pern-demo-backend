import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  statusIncludeAll,
  type TStatusCreateDataIn,
  type TStatusIncludeAll,
  type TStatusUpdatePatchDataIn,
  type TStatusUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/status.js";
import { statusAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";

export class StatusService {
  async create(dataIn: TStatusCreateDataIn, sessionUser: TSessionUser) {
    const statusCount = await prisma.status.count({
      where: { workspaceId: dataIn.workspaceId },
    });
    if (statusCount >= MAX_MODEL_ROWS_PER_USER.status) {
      throw new ApiValidationError({
        errors: [
          `There can be only ${MAX_MODEL_ROWS_PER_USER.status} statuses per user.`,
        ],
      });
    }

    const status = await prisma.status.create({
      data: dataIn,
      include: statusIncludeAll,
    });

    const isAuthorized = statusAuthorization.create(status, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return status;
  }

  async list(sessionUser: TSessionUser) {
    const statuses: TStatusIncludeAll[] = [];
    const workspaces = await prisma.workspace.findMany({
      where: { createdById: sessionUser.id },
    });

    for (const workspace of workspaces) {
      const workspacePriorties = await prisma.status.findMany({
        where: {
          workspaceId: workspace.id,
        },
        include: statusIncludeAll,
      });
      statuses.push(...workspacePriorties);
    }

    const isAuthorized = statusAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return statuses;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const status = await prisma.status.findUniqueOrThrow({
      where: { id },
      include: statusIncludeAll,
    });

    const isAuthorized = statusAuthorization.getById(status, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return status;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TStatusUpdatePatchDataIn | TStatusUpdatePutDataIn,
  ) {
    const status = await prisma.status.update({
      where: { id },
      data: excludeUndefinedKeys(dataIn),
      include: statusIncludeAll,
    });

    const isAuthorized = statusAuthorization.getById(status, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return status;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    const status = await prisma.status.delete({
      where: { id },
      include: statusIncludeAll,
    });

    const isAuthorized = statusAuthorization.deleteById(status, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return status;
  }
}

export const statusService = new StatusService();
