import app from "#/src/app.js";
import type { TCategory } from "#/src/modules/pernDemo/lib/definitions/org/category.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test category routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /category/list", async () => {
      const url = `${basePath}/category/list`;
      const response = await request(app).get(url);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin)", () => {
    test("It should create category.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "01";
      const workspaceName = generateTestName(idx, "category", "workspace");
      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;
      const categoryName = generateTestName(idx, "category", "category");
      response = await request.post(basePath + "/category").send({
        name: categoryName,
        workspaceId: workspace.id,
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(categoryName);
    });

    test("It should read categories.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "02";
      const workspaceName = generateTestName(idx, "category", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const categoryName = generateTestName(idx, "category", "category");

      response = await request.post(basePath + "/category").send({
        name: categoryName,
        workspaceId: workspace.id,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(categoryName);

      response = await request.get(`${basePath}/category/list`);
      expect(response.statusCode).toBe(200);

      const objs = response.body as Array<TCategory>;
      expect(objs.length).toBeGreaterThanOrEqual(1);

      const filteredObjs = objs.filter((o) => o.name === categoryName);
      expect(filteredObjs.length).toBe(1);
    });

    test("It should read category.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "03";
      const workspaceName = generateTestName(idx, "category", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const categoryName = generateTestName(idx, "category", "category");

      response = await request.post(basePath + "/category").send({
        name: categoryName,
        workspaceId: workspace.id,
      });

      response = await request.get(`${basePath}/category/${response.body.id}`);
      expect(response.body.name).toBe(categoryName);
    });

    test("It should update category.", async () => {
      const request = await signInAdmin();
      let response;
      const idx = "04";
      const workspaceName = generateTestName(idx, "category", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const categoryName = generateTestName(idx, "category", "category");

      response = await request.post(basePath + "/category").send({
        name: categoryName,
        workspaceId: workspace.id,
      });

      const newName = categoryName + ": updated";
      response = await request
        .patch(`${basePath}/category/${response.body.id}`)
        .send({ name: newName });

      expect(response.body.name).toBe(newName);
    });

    test("It should delete category.", async () => {
      const request = await signInAdmin();
      let response;

      const idx = "05";
      const workspaceName = generateTestName(idx, "category", "workspace");

      response = await request
        .post(basePath + "/workspace")
        .send({ name: workspaceName });
      const workspace = response.body;

      const categoryName = generateTestName(idx, "category", "category");

      response = await request.post(basePath + "/category").send({
        name: categoryName,
        workspaceId: workspace.id,
      });

      response = await request.delete(
        `${basePath}/category/${response.body.id}`,
      );
      expect(response.body.name).toBe(categoryName);

      response = await request.get(`${basePath}/category/list`);

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TCategory>;
      const filteredObjs = objs.filter((o) => o.name === categoryName);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
