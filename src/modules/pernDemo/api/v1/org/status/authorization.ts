import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { TStatusIncludeAll } from "#/src/modules/pernDemo/lib/definitions/org/status.js";

export class StatusAuthorization {
  checkCreator(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    return status.workspace.createdById === sessionUser.id;
  }

  create(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    return this.checkCreator(status, sessionUser);
  }

  list() {
    return true;
  }

  getById(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(status, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(status, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(status, sessionUser);

    return isAuthorized;
  }

  deleteById(status: TStatusIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(status, sessionUser);

    return isAuthorized;
  }
}

export const statusAuthorization = new StatusAuthorization();
