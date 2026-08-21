import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";

export class TaskAuthorization {
  checkCreator(createdById: string, sessionUser: TSessionUser) {
    return createdById === sessionUser.id;
  }

  create() {
    return true;
  }

  list() {
    return true;
  }

  getById(createdById: string, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(createdById, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(createdById: string, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(createdById, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(createdById: string, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(createdById, sessionUser);

    return isAuthorized;
  }

  deleteById(createdById: string, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(createdById, sessionUser);

    return isAuthorized;
  }
}

export const taskAuthorization = new TaskAuthorization();
