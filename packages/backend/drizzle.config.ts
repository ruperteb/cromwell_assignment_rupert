import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url:
      process.env.NODE_ENV === "test"
        ? process.env.DB_TEST_FILE_PATH!
        : process.env.DB_FILE_PATH!,
  },
});
