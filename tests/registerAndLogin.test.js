import mongoose from "mongoose";
import { User } from "../models/user.js";
import supertest from "supertest";
import { app } from "../app.js";
import dotenv from "dotenv";
dotenv.config();
const DB_TEST_URI = process.env.DB_TEST_URI;
describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should not register the same user 2 times", async () => {
    await supertest(app).post("/api/users/register").send({
      email: "testUser2@gmail.com",
      password: "Test123",
    });

    const response = await supertest(app).post("/api/users/register").send({
      email: "testUser2@gmail.com",
      password: "Test123",
    });

    expect(response.statusCode).toBe(409);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/users/register").send({
      email: "testUser1@gmail.com",
      password: "Test123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.user.email).toBe("testUser1@gmail.com");
  });
  it("should login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "testUser1@gmail.com",
      password: "Test123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("testUser1@gmail.com");
    expect(response.body.user.subscription).toBe("starter");
    expect(response.body.token).toBeDefined();
  });
});
