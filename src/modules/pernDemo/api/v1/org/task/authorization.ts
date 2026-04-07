import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { TTaskIncludeAll } from "#/src/modules/pernDemo/lib/definitions/org/task.js";

export class TaskAuthorization {
  checkCreator(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    return task.createdById === sessionUser.id;
  }

  create(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    return this.checkCreator(task, sessionUser);
  }

  list() {
    return true;
  }

  getById(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(task, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(task, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(task, sessionUser);

    return isAuthorized;
  }

  deleteById(task: TTaskIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(task, sessionUser);

    return isAuthorized;
  }
}

export const taskAuthorization = new TaskAuthorization();
