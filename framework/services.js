import supertest from "supertest";
import config from "../framework/config";
const request = supertest(config.url);

export async function authorization(username, password) {
  const response = await request
    .post("/Account/v1/Authorized")
    .set("accept", "application/json")
    .set("authorization", "Basic dGVzdDp0ZXN0")
    .set("Content-Type", "application/json")
    .send({
      userName: username,
      password: password,
    });

  return response;
}

export async function createUser(username, password) {
  const response = await request
    .post("/Account/v1/User")
    .set("accept", "application/json")
    .set("authorization", "Basic dGVzdDp0ZXN0")
    .set("Content-Type", "application/json")
    .send({
      userName: username,
      password: password,
    });

  return response;
}

export async function generateToken(username, password) {
  const response = await request
    .post("/Account/v1/GenerateToken")
    .set("accept", "application/json")
    .set("authorization", "Basic dGVzdDp0ZXN0")
    .set("Content-Type", "application/json")
    .send({
      userName: username,
      password: password,
    });

  return response;
}

export async function getUser(userID) {
  const response = await request
    .get(`/Account/v1/User/${userID}`)
    .set("accept", "application/json");

  return response;
}

export async function deleteUser(userID) {
  const response = await request
    .delete(`/Account/v1/User/${userID}`)
    .set("accept", "application/json");

  return response;
}
