import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: 'postgresql://shortslab-db_owner:0UIQSXui5qeM@ep-sweet-flower-a1o7qe3h.ap-southeast-1.aws.neon.tech/shortslab-db?sslmode=require'
  }
});