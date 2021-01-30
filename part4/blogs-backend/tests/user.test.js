const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");

test("invalid usesr cannot be added", async () => {
  const newUser = {
    username: "ll",
    name: "test",
    password: "test",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialUsers.length + 1);
  expect(titles).toContain("Canonical string reduction");
});

afterAll(() => {
  mongoose.connection.close();
});
