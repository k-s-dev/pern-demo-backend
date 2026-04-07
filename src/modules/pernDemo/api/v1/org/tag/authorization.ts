import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { Tag } from "#/src/modules/pernDemo/lib/definitions/prisma/client.js";

export class TagAuthorization {
  checkCreator(tag: Tag, sessionUser: TSessionUser) {
    return tag.createdById === sessionUser.id;
  }

  create() {
    return true;
  }

  list() {
    return true;
  }

  getById(tag: Tag, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(tag, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(tag: Tag, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(tag, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(tag: Tag, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(tag, sessionUser);

    return isAuthorized;
  }

  deleteById(tag: Tag, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(tag, sessionUser);

    return isAuthorized;
  }
}

export const tagAuthorization = new TagAuthorization();
