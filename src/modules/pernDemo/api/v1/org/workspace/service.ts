import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  workspaceIncludeAll,
  type TWorkspaceCreateDataIn,
  type TWorkspaceUpdatePatchDataIn,
  type TWorkspaceUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/workspace.js";
import { workspaceAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";

export class WorkspaceService {
  async create(dataIn: TWorkspaceCreateDataIn, sessionUser: TSessionUser) {
    let orgUser;
    orgUser = await prisma.orgUser.findUnique({
      where: { userId: sessionUser.id },
    });

    if (!orgUser) {
      orgUser = await prisma.orgUser.create({
        data: { userId: sessionUser.id },
      });
    }

    const workspaceCount = await prisma.workspace.count({
      where: { createdById: sessionUser.id },
    });
    if (workspaceCount >= MAX_MODEL_ROWS_PER_USER.workspace) {
      throw new ApiValidationError({
        errors: [
          `There can be only ${MAX_MODEL_ROWS_PER_USER.workspace} workspaces.`,
        ],
      });
    }

    const workspace = await prisma.workspace.create({
      data: {
        ...dataIn,
        createdById: sessionUser.id,
        categories: {
          create: [{ name: "Other" }],
        },
        statuses: {
          create: [
            { name: "Todo", code: "T", group: 1, order: 1 },
            { name: "In-progress", code: "I", group: 2, order: 2 },
            { name: "Cancelled", code: "C", group: 3, order: 3 },
            {
              name: "Done",
              code: "D",
              group: 3,
              order: 4,
              isCompletion: true,
            },
          ],
        },
        priorities: {
          create: [
            { name: "Low", code: "L", group: 1, order: 1 },
            { name: "Medium", code: "M", group: 2, order: 2 },
            { name: "High", code: "H", group: 3, order: 3 },
          ],
        },
      },
      include: workspaceIncludeAll,
    });

    const isAuthorized = workspaceAuthorization.create();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return workspace;
  }

  async list(sessionUser: TSessionUser) {
    const workspaces = await prisma.workspace.findMany({
      where: {
        createdById: sessionUser.id,
      },
      include: workspaceIncludeAll,
    });

    const isAuthorized = workspaceAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return workspaces;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const workspace = await prisma.workspace.findUniqueOrThrow({
      where: { id },
      include: workspaceIncludeAll,
    });

    const isAuthorized = workspaceAuthorization.getById(workspace, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return workspace;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TWorkspaceUpdatePatchDataIn | TWorkspaceUpdatePutDataIn,
  ) {
    const workspace = await prisma.workspace.update({
      where: { id },
      data: excludeUndefinedKeys(dataIn),
    });

    const isAuthorized = workspaceAuthorization.getById(workspace, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return workspace;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    const workspace = await prisma.workspace.delete({
      where: { id },
      include: workspaceIncludeAll,
    });

    const isAuthorized = workspaceAuthorization.getById(workspace, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return workspace;
  }
}

export const workspaceService = new WorkspaceService();
