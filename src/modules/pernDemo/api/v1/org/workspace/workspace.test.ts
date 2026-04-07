import app from "#/src/app.js";
import type {
  TWorkspace,
  TWorkspaceIncludeAll,
} from "#/src/modules/pernDemo/lib/definitions/org/workspace.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test workspace routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /workspace/list", async () => {
      const response = await request(app).get(basePath + "/workspace/list");
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin) ...", () => {
    test("It should create workspace.", async () => {
      const name = generateTestName("01", "workspace", "workspace");
      const request = await signInAdmin();
      const response = await request
        .post(basePath + "/workspace")
        .send({ name });
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(name);
    });

    test("It should read workspaces.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("02", "workspace", "workspace");

      response = await request.post(basePath + "/workspace").send({ name });
      response = await request.get(basePath + "/workspace/list");
      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TWorkspace>;
      expect(objs.length).toBeGreaterThanOrEqual(1);
      const findName = objs.filter((o) => o.name === name);
      expect(findName.length).toBe(1);
    });

    test("It should read workspace.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("03", "workspace", "workspace");

      response = await request.post(basePath + "/workspace").send({ name });
      response = await request.get(`${basePath}/workspace/${response.body.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(name);
    });

    test("It should update workspace.", async () => {
      const request = await signInAdmin();
      let response;
      let name = generateTestName("04", "workspace", "workspace");

      response = await request.post(basePath + "/workspace").send({ name });

      name = name + ": updated";
      response = await request
        .patch(`${basePath}/workspace/${response.body.id}`)
        .send({ name });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(name);
    });

    test("It should delete workspace.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("05", "workspace", "workspace");

      response = await request.post(basePath + "/workspace").send({ name });

      response = await request
        .delete(`${basePath}/workspace/${response.body.id}`)
        .send({ name });
      expect(response.body.name).toBe(name);

      response = await request.get(basePath + "/workspace/list");

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TWorkspaceIncludeAll>;
      const filteredObjs = objs.filter((o) => o.name === name);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
