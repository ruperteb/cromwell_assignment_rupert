import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
const db = drizzle(
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_FILE_PATH!
    : process.env.DB_FILE_PATH!,
  { schema }
);

export { db };
