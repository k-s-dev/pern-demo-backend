import request from "supertest";
import app from "./app.js";

describe("Test app is running", () => {
  test("It should get app root route.", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
