import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { getDatabaseUrl } from "@/env/dbEnv";

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

export const db = drizzle({ client: pool, schema });
