import type { TUserRole } from "../modules/pernDemo/lib/definitions/auth/user.js";

export const testUsers = {
  get user01() {
    return this.generateUser("01", "ADMIN", true);
  },
  get user02() {
    return this.generateUser("02", "USER", true);
  },
  get user03() {
    return this.generateUser("03", "USER", false);
  },
  password: "12345678@Ab",
  generateName: (userIdx: string) => `test user ${userIdx}`,
  generateEmail: (userIdx: string) => `test-user-${userIdx}@example.com`,
  generateUser(
    userIdx: string,
    role: TUserRole,
    emailVerified: boolean,
    password?: string,
  ) {
    return {
      name: this.generateName(userIdx),
      email: this.generateEmail(userIdx),
      password: password || this.password,
      role,
      emailVerified,
    };
  },
};

/**
 * generateTestName for tests. Provides namespace for specific test and model.
 *
 * @param id: string - Number or string for identification.
 * @param testName: string
 * @param modelName: string
 * @returns string
 *
 * // TODO
 * @example
 * ```
 * Write me later.
 * ```
 */
export function generateTestName(
  id: string,
  testName: string,
  modelName: string,
) {
  return `${testName}-test: ${modelName}-${id}`;
}
