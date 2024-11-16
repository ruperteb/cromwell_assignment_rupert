import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("users", {
  // Could potentially use a uuid here for the id
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  password: text().notNull(),
  email: text().notNull().unique(),
  role: text().notNull(),
  position: text(),
  mobile: text(),
  description: text(),
});
