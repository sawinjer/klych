import type { InferSelectModel } from "drizzle-orm";
import type { user } from "../../db/authSchema";

export type User = InferSelectModel<typeof user>;
