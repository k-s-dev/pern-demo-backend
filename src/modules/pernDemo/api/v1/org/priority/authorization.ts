import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { TPriorityIncludeAll } from "#/src/modules/pernDemo/lib/definitions/org/priority.js";

export class PriorityAuthorization {
  checkCreator(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    return priority.workspace.createdById === sessionUser.id;
  }

  create(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    return this.checkCreator(priority, sessionUser);
  }

  list() {
    return true;
  }

  getById(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(priority, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(priority, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(priority, sessionUser);

    return isAuthorized;
  }

  deleteById(priority: TPriorityIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(priority, sessionUser);

    return isAuthorized;
  }
}

export const priorityAuthorization = new PriorityAuthorization();
