import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  geometry,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { KlychCategory } from "@/lib/enums/KlychCategory";
import { user } from "./authSchema";

export const categoryEnum = pgEnum(
  "category",
  Object.values(KlychCategory) as [string],
);

export const klychStatus = pgEnum("klych_status", ["active", "finished"]);

export const respondStatus = pgEnum("respond_status", [
  "pending",
  "accepted",
  "declined",
]);

export const klych = pgTable("klych", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  category: categoryEnum("category").default(KlychCategory.Other).notNull(),
  coverImage: text("cover_image").notNull(),
  online: boolean("online").default(false).notNull(),
  locationName: text("location_name"),
  location: geometry("location", { type: "point", mode: "xy", srid: 4326 }),
  datetimeOfOccurance: timestamp("datetime_of_occurance").notNull(),
  requiredPeoplesAmount: numeric("required_peoples_amount"),
  status: klychStatus("status").default("active").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const klychResponds = pgTable("klych_responds", {
  id: text("id").primaryKey(),
  klychId: text("klych_id")
    .notNull()
    .references(() => klych.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: respondStatus("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const klychLike = pgTable("klych_likes", {
  id: text("id").primaryKey(),
  klychId: text("klych_id")
    .notNull()
    .references(() => klych.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Klych = InferSelectModel<typeof klych>;
