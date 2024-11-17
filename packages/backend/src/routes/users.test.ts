import request from "supertest";
import { encrypt } from "../lib/session";
import { resetTestDB } from "../db/resetTest";

import { app } from "../server";

const agent = request.agent(app);

const tokenDuration = 60 * 60 * 1000; // i.e. one hour in seconds

const expiresAt = new Date(Date.now() + tokenDuration);

describe("User routes", () => {
  beforeAll(async () => {
    await resetTestDB();
  });
  describe("Auth middleware", () => {
    test("Not authorised", async () => {
      const userRes = await agent.get("/users/me");
      expect(userRes.statusCode).toBe(401);
      expect(userRes.text).toBe("Not authorised");
    });

    test("Invalid session", async () => {
      agent.set("Cookie", [`session=123`]);
      const userRes = await agent.get("/users/me");
      expect(userRes.statusCode).toBe(403);
      expect(userRes.text).toBe("Invalid session");
    });

    test("Not authorised - admin", async () => {
      const userSession = await encrypt({ userId: 2, role: "user", expiresAt });
      agent.set("Cookie", [`session=${userSession}`]);
      const userRes = await agent.get("/users");
      expect(userRes.statusCode).toBe(401);
      expect(userRes.text).toBe("Not authorised");
    });
  });

  describe("User role", () => {
    test("Get own user - success", async () => {
      const userSession = await encrypt({ userId: 2, role: "user", expiresAt });
      agent.set("Cookie", [`session=${userSession}`]);

      const userRes = await agent.get("/users/me");
      expect(userRes.statusCode).toBe(200);
      expect(userRes.body.userId).toBe(2);
    });

    test("Update own user - success", async () => {
      const userSession = await encrypt({ userId: 2, role: "user", expiresAt });
      agent.set("Cookie", [`session=${userSession}`]);

      const userRes = await agent.patch("/users/me").send({ name: "Test" });
      expect(userRes.statusCode).toBe(200);
      expect(userRes.body.name).toBe("Test");
    });

    test("Delete own user - success", async () => {
      const userSession = await encrypt({ userId: 2, role: "user", expiresAt });
      agent.set("Cookie", [`session=${userSession}`]);

      const userRes = await agent.delete("/users/me");
      expect(userRes.statusCode).toBe(200);
      expect(userRes.text).toBe("Profile deleted");
    });
  });
  describe("Admin role", () => {
    beforeAll(async () => {
      await resetTestDB();
    });

    test("Get all users - success", async () => {
      const adminSession = await encrypt({
        userId: 1,
        role: "admin",
        expiresAt,
      });
      agent.set("Cookie", [`session=${adminSession}`]);

      const usersRes = await agent.get("/users");
      expect(usersRes.statusCode).toBe(200);
      expect(usersRes.body).toHaveLength(2);
    });

    test("Get user - success", async () => {
      const adminSession = await encrypt({
        userId: 1,
        role: "admin",
        expiresAt,
      });
      agent.set("Cookie", [`session=${adminSession}`]);

      const usersRes = await agent.get("/users/2");
      expect(usersRes.statusCode).toBe(200);
      expect(usersRes.body.userId).toBe(2);
    });

    test("Update user - success", async () => {
      const adminSession = await encrypt({
        userId: 1,
        role: "admin",
        expiresAt,
      });
      agent.set("Cookie", [`session=${adminSession}`]);

      const userRes = await agent.patch("/users/2").send({ name: "Test" });
      expect(userRes.statusCode).toBe(200);
      expect(userRes.body.name).toBe("Test");
    });

    test("Delete user - success", async () => {
      const adminSession = await encrypt({
        userId: 1,
        role: "admin",
        expiresAt,
      });
      agent.set("Cookie", [`session=${adminSession}`]);

      const userRes = await agent.delete("/users/2");
      expect(userRes.statusCode).toBe(200);
      expect(userRes.text).toBe("Profile deleted");
    });
  });
});
