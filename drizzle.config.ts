/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  dbCredentials: {
    url: "postgresql://neondb_owner:s4hypbH5xWIO@ep-bold-queen-a5l03iiq.us-east-2.aws.neon.tech/Bestbrain-Student-Tracker?sslmode=require",
  },
};
