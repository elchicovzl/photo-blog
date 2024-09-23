import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { userLogs } from "./user-logs";
import { userTypes } from "./user-types";

const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 2048 }).notNull(),
  isActive: boolean("isActive").default(true),
  lastLogin: timestamp("lastLogin", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userLogs: many(userLogs),
}));

export const userTypesRelations = relations(userTypes, ({ one }) => ({
  type: one(users, {
    fields: [userTypes.id],
    references: [users.id],
  }),
}));

export default users;
