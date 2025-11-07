import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  decimal,
  numeric,
  geometry,
} from "drizzle-orm/pg-core";
import { user } from "./authSchema";
import { KlychCategory } from "@/lib/enums/KlychCategory";
import { InferSelectModel } from "drizzle-orm";

export const categoryEnum = pgEnum(
  "category",
  Object.values(KlychCategory) as [string],
);

export const klych = pgTable("klych", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  category: categoryEnum("category").default(KlychCategory.Other).notNull(),
  coverImage: text("cover_image").notNull(),
  requiresSpecialSkills: boolean("requires_special_skills")
    .default(false)
    .notNull(),
  online: boolean("online").default(false).notNull(),
  locationName: text("location_name"),
  location: geometry("location", { type: "point", mode: "xy", srid: 4326 }),
  datetimeOfOccurance: timestamp("datetime_of_occurance").notNull(),
  requiredPeoplesAmount: numeric("required_peoples_amount").notNull(),

  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Klych = InferSelectModel<typeof klych>;
