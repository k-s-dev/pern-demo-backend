import app from "#/src/app.js";
import type { TStatus } from "#/src/modules/pernDemo/lib/definitions/org/status.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test status routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /status/list", async () => {
      const url = `${basePath}/status/list`;
      const response = await request(app).get(url);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin)", () => {
    test("It should create status.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "01";
      const workspaceName = generateTestName(idx, "status", "workspace");
      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;
      const statusName = generateTestName(idx, "status", "status");
      response = await request.post(basePath + "/status").send({
        name: statusName,
        code: idx,
        group: 1,
        order: 5,
        workspaceId: workspace.id,
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(statusName);
    });

    test("It should read statuses.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "02";
      const workspaceName = generateTestName(idx, "status", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const statusName = generateTestName(idx, "status", "status");

      response = await request.post(basePath + "/status").send({
        name: statusName,
        code: idx,
        group: 1,
        order: 5,
        workspaceId: workspace.id,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(statusName);

      response = await request.get(`${basePath}/status/list`);
      expect(response.statusCode).toBe(200);

      const objs = response.body as Array<TStatus>;
      expect(objs.length).toBeGreaterThanOrEqual(1);

      const filteredObjs = objs.filter((o) => o.name === statusName);
      expect(filteredObjs.length).toBe(1);
    });

    test("It should read status.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "03";
      const workspaceName = generateTestName(idx, "status", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const statusName = generateTestName(idx, "status", "status");

      response = await request.post(basePath + "/status").send({
        name: statusName,
        code: idx,
        group: 1,
        order: 5,
        workspaceId: workspace.id,
      });

      response = await request.get(`${basePath}/status/${response.body.id}`);
      expect(response.body.name).toBe(statusName);
    });

    test("It should update status.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "04";
      const workspaceName = generateTestName(idx, "status", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const statusName = generateTestName(idx, "status", "status");

      response = await request.post(basePath + "/status").send({
        name: statusName,
        code: idx,
        group: 1,
        order: 5,
        workspaceId: workspace.id,
      });

      const newName = statusName + ": updated";
      response = await request
        .patch(`${basePath}/status/${response.body.id}`)
        .send({ name: newName });

      expect(response.body.name).toBe(newName);
    });

    test("It should delete status.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "05";
      const workspaceName = generateTestName(idx, "status", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const statusName = generateTestName(idx, "status", "status");

      response = await request.post(basePath + "/status").send({
        name: statusName,
        code: idx,
        group: 1,
        order: 5,
        workspaceId: workspace.id,
      });

      response = await request.delete(`${basePath}/status/${response.body.id}`);
      expect(response.body.name).toBe(statusName);

      response = await request.get(`${basePath}/status/list`);

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TStatus>;
      const filteredObjs = objs.filter((o) => o.name === statusName);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
