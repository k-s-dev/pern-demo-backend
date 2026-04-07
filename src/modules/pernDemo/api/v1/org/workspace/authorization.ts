import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { Workspace } from "#/src/modules/pernDemo/lib/definitions/prisma/client.js";

export class WorkspaceAuthorization {
  checkCreator(workspace: Workspace, sessionUser: TSessionUser) {
    return workspace.createdById === sessionUser.id;
  }

  create() {
    return true;
  }

  list() {
    return true;
  }

  getById(workspace: Workspace, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(workspace, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(workspace: Workspace, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(workspace, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(workspace: Workspace, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(workspace, sessionUser);

    return isAuthorized;
  }

  deleteById(workspace: Workspace, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(workspace, sessionUser);

    return isAuthorized;
  }
}

export const workspaceAuthorization = new WorkspaceAuthorization();
