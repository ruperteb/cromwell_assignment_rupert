import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { hash } from "bcrypt";
import { usersTable } from "./schema";

const db = drizzle(process.env.DB_FILE_PATH!);
async function main() {
  console.log("Resetting database...");
  // Remove all records in the table
  await db.delete(usersTable);

  // Reset id autoincrement
  await db.run(sql`
    DELETE FROM SQLITE_SEQUENCE WHERE NAME = 'users';`);

  // Encrypt the user's password
  const mockPassword = await hash("admin", 10);

  const user: typeof usersTable.$inferInsert = {
    name: "John Doe",
    email: "jdoe@cromwell.com",
    password: mockPassword,
    role: "admin",
    position: "Database Administrator",
    mobile: "07812345678",
    description: "Skilled db admin with many years of experience.",
  };
  await db.insert(usersTable).values(user);
  console.log("New admin user created...");
  const users = await db.select().from(usersTable);
  console.log("Retrieving users: ", users);
  console.log("Reset complete");
}
main();
