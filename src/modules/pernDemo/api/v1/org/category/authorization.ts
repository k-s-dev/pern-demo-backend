import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.js";
import type { TCategoryIncludeAll } from "#/src/modules/pernDemo/lib/definitions/org/category.js";

export class CategoryAuthorization {
  checkCreator(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    return category.workspace.createdById === sessionUser.id;
  }

  create(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    return this.checkCreator(category, sessionUser);
  }

  list() {
    return true;
  }

  getById(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(category, sessionUser);

    return isAuthorized;
  }

  updateByIdPatch(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(category, sessionUser);

    return isAuthorized;
  }

  updateByIdPut(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(category, sessionUser);

    return isAuthorized;
  }

  deleteById(category: TCategoryIncludeAll, sessionUser: TSessionUser) {
    let isAuthorized = false;

    isAuthorized = this.checkCreator(category, sessionUser);

    return isAuthorized;
  }
}

export const categoryAuthorization = new CategoryAuthorization();
