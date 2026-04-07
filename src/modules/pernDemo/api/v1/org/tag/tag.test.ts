import app from "#/src/app.js";
import type {
  TTag,
  TTagIncludeAll,
} from "#/src/modules/pernDemo/lib/definitions/org/tag.js";
import { generateTestName } from "#/src/tests/data.js";
import { signInAdmin } from "#/src/tests/supertest/index.js";
import request from "supertest";

const basePath = "/pern-demo/api/v1/org";

describe("Test tag routes.", () => {
  describe("Without authenticated user ...", () => {
    test("It should response error for GET /tag/list", async () => {
      const response = await request(app).get(basePath + "/tag/list");
      expect(response.statusCode).toBe(401);
    });
  });

  describe("With authenticated user (role=admin) ...", () => {
    test("It should create tag.", async () => {
      const name = generateTestName("01", "tag", "tag");
      const request = await signInAdmin();
      const response = await request.post(basePath + "/tag").send({ name });
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(name);
    });

    test("It should read tags.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("02", "tag", "tag");

      response = await request.post(basePath + "/tag").send({ name });
      response = await request.get(basePath + "/tag/list");
      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TTag>;
      expect(objs.length).toBeGreaterThanOrEqual(1);
      const findName = objs.filter((o) => o.name === name);
      expect(findName.length).toBe(1);
    });

    test("It should read tag.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("03", "tag", "tag");

      response = await request.post(basePath + "/tag").send({ name });
      response = await request.get(`${basePath}/tag/${response.body.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(name);
    });

    test("It should update tag.", async () => {
      const request = await signInAdmin();
      let response;
      let name = generateTestName("04", "tag", "tag");

      response = await request.post(basePath + "/tag").send({ name });

      name = name + ": updated";
      response = await request
        .patch(`${basePath}/tag/${response.body.id}`)
        .send({ name });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(name);
    });

    test("It should delete tag.", async () => {
      const request = await signInAdmin();
      let response;
      const name = generateTestName("05", "tag", "tag");

      response = await request.post(basePath + "/tag").send({ name });

      response = await request
        .delete(`${basePath}/tag/${response.body.id}`)
        .send({ name });
      expect(response.body.name).toBe(name);

      response = await request.get(basePath + "/tag/list");

      expect(response.statusCode).toBe(200);
      const objs = response.body as Array<TTagIncludeAll>;
      const filteredObjs = objs.filter((o) => o.name === name);
      expect(filteredObjs.length).toBe(0);
    });
  });
});
