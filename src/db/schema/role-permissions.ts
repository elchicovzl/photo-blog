import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import permissions from "./permissions";
import roles from "./roles";

export const rolePermissions = pgTable("role_permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  roleId: uuid("role_id").references(() => roles.id),
  permissionId: uuid("permission_id").references(() => permissions.id),
  assignedAt: timestamp("assignedAt", { mode: "date" }).defaultNow(),
});

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
);
