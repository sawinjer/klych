import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getDatabaseUrl } from "@/env/dbEnv";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

export const db = drizzle({ client: pool, schema });
