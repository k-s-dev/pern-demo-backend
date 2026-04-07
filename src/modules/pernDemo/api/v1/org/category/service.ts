import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  categoryIncludeAll,
  type TCategoryCreateDataIn,
  type TCategoryIncludeAll,
  type TCategoryUpdatePatchDataIn,
  type TCategoryUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/category.js";
import { categoryAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";

export class CategoryService {
  async create(dataIn: TCategoryCreateDataIn, sessionUser: TSessionUser) {
    const categoryCount = await prisma.category.count({
      where: { workspaceId: dataIn.workspaceId },
    });
    if (categoryCount >= MAX_MODEL_ROWS_PER_USER.category) {
      throw new ApiValidationError({
        errors: [
          `There can be only ${MAX_MODEL_ROWS_PER_USER.category} categories per user.`,
        ],
      });
    }

    const category = await prisma.category.create({
      data: dataIn,
      include: categoryIncludeAll,
    });

    const isAuthorized = categoryAuthorization.create(category, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return category;
  }

  async list(sessionUser: TSessionUser) {
    const categories: TCategoryIncludeAll[] = [];
    const workspaces = await prisma.workspace.findMany({
      where: { createdById: sessionUser.id },
    });

    for (const workspace of workspaces) {
      const workspacePriorties = await prisma.category.findMany({
        where: {
          workspaceId: workspace.id,
        },
        include: categoryIncludeAll,
      });
      categories.push(...workspacePriorties);
    }

    const isAuthorized = categoryAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return categories;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
      include: categoryIncludeAll,
    });

    const isAuthorized = categoryAuthorization.getById(category, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return category;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TCategoryUpdatePatchDataIn | TCategoryUpdatePutDataIn,
  ) {
    const category = await prisma.category.update({
      where: { id },
      data: excludeUndefinedKeys(dataIn),
      include: categoryIncludeAll,
    });

    const isAuthorized = categoryAuthorization.getById(category, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return category;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    const category = await prisma.category.delete({
      where: { id },
      include: categoryIncludeAll,
    });

    const isAuthorized = categoryAuthorization.deleteById(
      category,
      sessionUser,
    );
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return category;
  }
}

export const categoryService = new CategoryService();
