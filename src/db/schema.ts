import { sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  text,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  user_type: text("user_type").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

export type User = typeof users.$inferSelect;

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  cost: integer("cost").notNull(),
  status: text("status").notNull(),
  in_stock: boolean("in_stock").notNull().default(true),
});

export type Inventory = typeof inventory.$inferSelect;

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  inventory_id: uuid("inventory_id")
    .references(() => inventory.id)
    .notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  buyer_id: uuid("buyer_id")
    .references(() => users.id)
    .notNull(),
});

export type Order = typeof orders.$inferSelect;

export const complains = pgTable("complains", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  issue: text("issue").notNull(),
  location: text("location").notNull(),
  date: date("date", { mode: "date" }).notNull(),
});

export type Complain = typeof complains.$inferSelect;
export type NewComplain = typeof complains.$inferInsert;
