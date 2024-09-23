import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import roles from "./roles";
import users from "./users";

export const userRoles = pgTable("user_role", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  roleId: uuid("role_id").references(() => roles.id),
  assignedAt: timestamp("assignedAt", { mode: "date" }).defaultNow(),
});

export const usersRolesRelations = relations(userRoles, ({ one }) => ({
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
}));
