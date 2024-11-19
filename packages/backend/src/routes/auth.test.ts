import request from "supertest";
import { encrypt } from "../lib/session";
import { resetTestDB } from "../db/resetTest";

import { app } from "../server";

const agent = request.agent(app);

const tokenDuration = 60 * 60 * 1000; // i.e. one hour in seconds
const expiresAt = new Date(Date.now() + tokenDuration);

describe("Auth routes", () => {
  beforeAll(async () => {
    await resetTestDB();
  });
  describe("No session expected", () => {
    describe("Login", () => {
      test("Successful login", async () => {
        const loginRes = await agent.post("/auth/login").send({
          email: "jdoe@cromwell.com",
          password: "admin@123",
        });

        expect(loginRes.statusCode).toBe(200);
        expect(loginRes.headers["set-cookie"][0]).toMatch(/session=/); // Session cookie has been set
        expect(loginRes.body.userId).toBe(1); // The correct userId is returned
      });

      test("Failed login - incorrect email", async () => {
        const loginRes = await agent.post("/auth/login").send({
          email: "jdoe1@cromwell.com",
          password: "admin@123",
        });

        expect(loginRes.statusCode).toBe(404);
        expect(loginRes.headers["set-cookie"]).toBeUndefined();
        expect(loginRes.body.userId).toBeUndefined();
        expect(loginRes.text).toBe("User does not exist");
      });

      test("Failed login - incorrect password", async () => {
        const loginRes = await agent.post("/auth/login").send({
          email: "jdoe@cromwell.com",
          password: "admin",
        });

        expect(loginRes.statusCode).toBe(401);
        expect(loginRes.headers["set-cookie"]).toBeUndefined();
        expect(loginRes.body.userId).toBeUndefined();
        expect(loginRes.text).toBe("Invalid password");
      });
    });
    describe("Registration", () => {
      test("Successful registration", async () => {
        const registrationRes = await agent.post("/auth/register").send({
          name: "New user",
          email: "abc@cromwell.com",
          password: "test@123",
        });

        expect(registrationRes.statusCode).toBe(200);
        expect(registrationRes.headers["set-cookie"][0]).toMatch(/session=/); // Session cookie has been set
        expect(registrationRes.body.userId).toBe(3); // The correct userId is returned
      });

      test("Failed registration - email exists", async () => {
        const registrationRes = await agent.post("/auth/register").send({
          name: "New user",
          email: "jdoe@cromwell.com",
          password: "test@123",
        });

        expect(registrationRes.statusCode).toBe(400);
        expect(registrationRes.headers["set-cookie"]).toBeUndefined();
        expect(registrationRes.body.userId).toBeUndefined();
        expect(registrationRes.text).toBe(
          "A profile with this email address already exists"
        );
      });

      test("Failed registration - name exists", async () => {
        const registrationRes = await agent.post("/auth/register").send({
          name: "John Doe",
          email: "jdoe1@cromwell.com",
          password: "test@123",
        });

        expect(registrationRes.statusCode).toBe(400);
        expect(registrationRes.headers["set-cookie"]).toBeUndefined();
        expect(registrationRes.body.userId).toBeUndefined();
        expect(registrationRes.text).toBe(
          "A profile with this name already exists"
        );
      });
    });
  });
  describe("Session expected", () => {
    describe("Logout", () => {
      test("Successful logout", async () => {
        const adminSession = await encrypt({
          userId: 1,
          role: "admin",
          expiresAt,
        });
        agent.set("Cookie", [`session=${adminSession}`]);
        const logoutRes = await agent.get("/auth/logout");

        expect(logoutRes.statusCode).toBe(200);
        expect(logoutRes.headers["set-cookie"][0]).toMatch(/\bsession=;/); // For some reason the session cookie is not fully removed in the test runner, but does still have its value removed as a fallback
        expect(logoutRes.text).toBe("Logout successful");
      });
    });

    describe("Verify", () => {
      test("Successful verification", async () => {
        const adminSession = await encrypt({
          userId: 1,
          role: "admin",
          expiresAt,
        });
        agent.set("Cookie", [`session=${adminSession}`]);
        const verifyRes = await agent.get("/auth/verify");

        expect(verifyRes.statusCode).toBe(200);
        expect(verifyRes.body.userId).toBe(1);
        expect(verifyRes.body.isAuth).toBe(true);
      });

      test("Failed verification - no session cookie", async () => {
        agent.set("Cookie", []);
        const verifyRes = await agent.get("/auth/verify");

        expect(verifyRes.statusCode).toBe(200);
        expect(verifyRes.body.userId).toBeUndefined();
        expect(verifyRes.body.isAuth).toBe(false);
      });
      test("Failed verification - invalid session cookie", async () => {
        agent.set("Cookie", ['session=123']);
        const verifyRes = await agent.get("/auth/verify");

        expect(verifyRes.statusCode).toBe(200);
        expect(verifyRes.body.userId).toBeUndefined();
        expect(verifyRes.body.isAuth).toBe(false);
      });
    });
  });
});
