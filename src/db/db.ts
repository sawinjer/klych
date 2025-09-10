import { getDatabaseUrl } from "@/env/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

export const db = drizzle({ client: pool });
