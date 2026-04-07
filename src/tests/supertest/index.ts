import app from "#/src/app.js";
import { pernDemoConfig } from "#/src/modules/pernDemo/lib/config.js";
import request from "supertest";
import { testUsers } from "../data.js";

export async function signInAdmin() {
  const req = request.agent(app);
  const response = await req
    .post(`${pernDemoConfig.auth.basePath}/sign-in/email`)
    .send({
      email: testUsers.user01.email,
      password: testUsers.user01.password,
    });

  const setCookies = response.headers["set-cookie"] as unknown as string[];
  req.set("Cookie", setCookies);

  return req;
}
