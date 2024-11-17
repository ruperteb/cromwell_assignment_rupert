import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { hash } from "bcrypt";
import { usersTable } from "./schema";

const db = drizzle(
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_FILE_PATH!
    : process.env.DB_FILE_PATH!
);

export async function resetTestDB() {
  console.log("Resetting database...");
  // Remove all records in the table
  await db.delete(usersTable);

  // Reset id autoincrement
  await db.run(sql`
    DELETE FROM SQLITE_SEQUENCE WHERE NAME = 'users';`);

  // Encrypt the users' passwords
  const mockAdminPassword = await hash("admin", 10);
  const mockUserPassword = await hash("user", 10);

  const adminUser: typeof usersTable.$inferInsert = {
    name: "John Doe",
    email: "jdoe@cromwell.com",
    password: mockAdminPassword,
    role: "admin",
    position: "Database Administrator",
    mobile: "07812345678",
    description: "Skilled db admin with many years of experience.",
  };

  const user: typeof usersTable.$inferInsert = {
    name: "Sally Jones",
    email: "sjones@cromwell.com",
    password: mockUserPassword,
    role: "user",
    position: "Developer",
    mobile: "07887654321",
    description: "Knowledgeable frontend developer",
  };
  await db.insert(usersTable).values([adminUser, user]);
  console.log("New users created...");
  const users = await db.select().from(usersTable);
  console.log("Retrieving users: ", users);
  console.log("Reset complete");
}
