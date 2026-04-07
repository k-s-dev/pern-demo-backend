import { prisma } from "#/src/modules/pernDemo/lib/db/service.js";
import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import {
  tagIncludeAll,
  type TTagCreateDataIn,
  type TTagUpdatePatchDataIn,
  type TTagUpdatePutDataIn,
} from "#/src/modules/pernDemo/lib/definitions/org/tag.js";
import { tagAuthorization } from "./authorization.js";
import {
  ApiAuthorizationError,
  ApiValidationError,
} from "#/src/lib/error/definitions.js";
import { excludeUndefinedKeys } from "#/src/lib/utils/definitions.js";
import { MAX_MODEL_ROWS_PER_USER } from "#/src/modules/pernDemo/lib/definitions/constants.js";

export class TagService {
  async create(dataIn: TTagCreateDataIn, sessionUser: TSessionUser) {
    const tagCount = await prisma.tag.count();
    if (tagCount >= MAX_MODEL_ROWS_PER_USER.tag) {
      throw new ApiValidationError({
        errors: [`There can be only ${MAX_MODEL_ROWS_PER_USER.tag} tags.`],
      });
    }

    const tag = await prisma.tag.create({
      data: {
        ...dataIn,
        createdBy: {
          connectOrCreate: {
            create: { userId: sessionUser.id },
            where: { userId: sessionUser.id },
          },
        },
      },
    });

    const isAuthorized = tagAuthorization.create();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tag;
  }

  async list(sessionUser: TSessionUser) {
    const tags = await prisma.tag.findMany({
      where: {
        createdById: sessionUser.id,
      },
      include: tagIncludeAll,
    });

    const isAuthorized = tagAuthorization.list();
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tags;
  }

  async getById(id: string, sessionUser: TSessionUser) {
    const tag = await prisma.tag.findUniqueOrThrow({
      where: { id },
      include: tagIncludeAll,
    });

    const isAuthorized = tagAuthorization.getById(tag, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tag;
  }

  async updateById(
    id: string,
    sessionUser: TSessionUser,
    dataIn: TTagUpdatePatchDataIn | TTagUpdatePutDataIn,
  ) {
    const tag = await prisma.tag.update({
      where: { id },
      data: excludeUndefinedKeys(dataIn),
    });

    const isAuthorized = tagAuthorization.getById(tag, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tag;
  }

  async deleteById(id: string, sessionUser: TSessionUser) {
    const tag = await prisma.tag.delete({
      where: { id },
    });

    const isAuthorized = tagAuthorization.getById(tag, sessionUser);
    if (!isAuthorized) {
      throw new ApiAuthorizationError({});
    }

    return tag;
  }
}

export const tagService = new TagService();
