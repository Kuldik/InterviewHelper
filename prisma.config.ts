import { existsSync } from "node:fs";

import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

if (existsSync(".env.local")) {
  loadEnv({ path: ".env.local" });
}
if (existsSync(".env")) {
  loadEnv({ path: ".env" });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  }
});
