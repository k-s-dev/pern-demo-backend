import { hash, type Options, verify } from "@node-rs/argon2";
import { nextDemoApiConfig } from "../config.js";

const opts: Options = {
  memoryCost: nextDemoApiConfig.auth.passwordHashCost,
  timeCost: 3, // 3 iterations
  parallelism: 4, // 4 lanes
  outputLen: 32, // 32 bytes
  algorithm: 2, // Argon2id
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;
  const result = await verify(hash, password, opts);
  return result;
}
