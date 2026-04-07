import app from "#/src/app.js";
import type { TPriority } from "#/src/modules/pernDemo/lib/definitions/org/priority.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test priority routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /priority/list", async () => {
      const url = `${basePath}/priority/list`;
      const response = await request(app).get(url);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin)", () => {
    test("It should create priority.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "01";
      const workspaceName = generateTestName(idx, "priority", "workspace");
      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;
      const priorityName = generateTestName(idx, "priority", "priority");
      response = await request.post(basePath + "/priority").send({
        name: priorityName,
        code: idx,
        group: 1,
        order: 4,
        workspaceId: workspace.id,
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(priorityName);
    });

    test("It should read priorities.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "02";
      const workspaceName = generateTestName(idx, "priority", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const priorityName = generateTestName(idx, "priority", "priority");

      response = await request.post(basePath + "/priority").send({
        name: priorityName,
        code: idx,
        group: 1,
        order: 4,
        workspaceId: workspace.id,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(priorityName);

      response = await request.get(`${basePath}/priority/list`);
      expect(response.statusCode).toBe(200);

      const objs = response.body as Array<TPriority>;
      expect(objs.length).toBeGreaterThanOrEqual(1);

      const filteredObjs = objs.filter((o) => o.name === priorityName);
      expect(filteredObjs.length).toBe(1);
    });

    test("It should read priority.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "03";
      const workspaceName = generateTestName(idx, "priority", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const priorityName = generateTestName(idx, "priority", "priority");

      response = await request.post(basePath + "/priority").send({
        name: priorityName,
        code: idx,
        group: 1,
        order: 4,
        workspaceId: workspace.id,
      });

      response = await request.get(`${basePath}/priority/${response.body.id}`);
      expect(response.body.name).toBe(priorityName);
    });

    test("It should update priority.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "04";
      const workspaceName = generateTestName(idx, "priority", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const priorityName = generateTestName(idx, "priority", "priority");

      response = await request.post(basePath + "/priority").send({
        name: priorityName,
        code: idx,
        group: 1,
        order: 4,
        workspaceId: workspace.id,
      });

      const newName = priorityName + ": updated";
      response = await request
        .patch(`${basePath}/priority/${response.body.id}`)
        .send({ name: newName });

      expect(response.body.name).toBe(newName);
    });

    test("It should delete priority.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "05";
      const workspaceName = generateTestName(idx, "priority", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const priorityName = generateTestName(idx, "priority", "priority");

      response = await request.post(basePath + "/priority").send({
        name: priorityName,
        code: idx,
        group: 1,
        order: 4,
        workspaceId: workspace.id,
      });

      response = await request.delete(
        `${basePath}/priority/${response.body.id}`,
      );
      expect(response.body.name).toBe(priorityName);

      response = await request.get(`${basePath}/priority/list`);

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TPriority>;
      const filteredObjs = objs.filter((o) => o.name === priorityName);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
