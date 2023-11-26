import supertest from "supertest";

import openApi from "./url";
//import openApi from "../framework/url";
const request = supertest(openApi.url);

export async function register(email, name, password) {
  const response = await request
    .post("/doregister")
    .set("accept", "application/json")
    .send({
      email: email,
      name: name,
      password: password,
    });

  return response;
}

export async function getUser(email) {
  const response = await request
    .post("/getuser")
    .set("accept", "application/json")
    .send({
      email: email,
    });

  return response;
}

export async function editUser(email, field, value) {
  const response = await request
    .post("/useronefield")
    .set("accept", "application/json")
    .send({
      email: email,
      field: field,
      value: value,
    });

  return response;
}

export async function deleteAvatar(email) {
  const response = await request
    .post("/deleteavatar")
    .set("accept", "application/json")
    .send({
      email: email,
    });

  return response;
}
