import app from "#/src/app.js";
import type { TTask } from "#/src/modules/pernDemo/lib/definitions/org/task.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test task routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /task/list", async () => {
      const url = `${basePath}/task/list`;
      const response = await request(app).get(url);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin)", () => {
    test("It should create task.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "01";
      const workspaceName = generateTestName(idx, "task", "workspace");
      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;
      const taskName = generateTestName(idx, "task", "task");
      response = await request.post(basePath + "/task").send({
        title: taskName,
        categoryId: workspace.categories[0].id,
        priorityId: workspace.priorities[0].id,
        statusId: workspace.statuses[0].id,
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(taskName);
    });

    test("It should read tasks.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "02";
      const workspaceName = generateTestName(idx, "task", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const taskTitle = generateTestName(idx, "task", "task");

      response = await request.post(basePath + "/task").send({
        title: taskTitle,
        categoryId: workspace.categories[0].id,
        priorityId: workspace.priorities[0].id,
        statusId: workspace.statuses[0].id,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(taskTitle);

      response = await request.get(`${basePath}/task/list`);
      expect(response.statusCode).toBe(200);

      const objs = response.body as Array<TTask>;
      expect(objs.length).toBeGreaterThanOrEqual(1);

      const filteredObjs = objs.filter((o) => o.title === taskTitle);
      expect(filteredObjs.length).toBe(1);
    });

    test("It should read task.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "03";
      const workspaceName = generateTestName(idx, "task", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const taskTitle = generateTestName(idx, "task", "task");

      response = await request.post(basePath + "/task").send({
        title: taskTitle,
        categoryId: workspace.categories[0].id,
        priorityId: workspace.priorities[0].id,
        statusId: workspace.statuses[0].id,
      });

      response = await request.get(`${basePath}/task/${response.body.id}`);
      expect(response.body.title).toBe(taskTitle);
    });

    test("It should update task.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "04";
      const workspaceName = generateTestName(idx, "task", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const taskTitle = generateTestName(idx, "task", "task");

      response = await request.post(basePath + "/task").send({
        title: taskTitle,
        categoryId: workspace.categories[0].id,
        priorityId: workspace.priorities[0].id,
        statusId: workspace.statuses[0].id,
      });

      const newTitle = taskTitle + ": updated";
      response = await request
        .patch(`${basePath}/task/${response.body.id}`)
        .send({ title: newTitle });

      expect(response.body.title).toBe(newTitle);
    });

    test("It should delete task.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "05";
      const workspaceName = generateTestName(idx, "task", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const taskTitle = generateTestName(idx, "task", "task");

      response = await request.post(basePath + "/task").send({
        title: taskTitle,
        categoryId: workspace.categories[0].id,
        priorityId: workspace.priorities[0].id,
        statusId: workspace.statuses[0].id,
      });

      response = await request.delete(`${basePath}/task/${response.body.id}`);
      expect(response.body.title).toBe(taskTitle);

      response = await request.get(`${basePath}/task/list`);

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TTask>;
      const filteredObjs = objs.filter((o) => o.title === taskTitle);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
