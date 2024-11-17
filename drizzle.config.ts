import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });


export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        password: process.env.POSTGRES_PASSWORD!,
        host: process.env.POSTGRES_HOST!,
        database: process.env.POSTGRES_DATABASE!,
        user: process.env.POSTGRES_USER!,
        ssl: true,
    },
    verbose: true,
    strict: true,
})
