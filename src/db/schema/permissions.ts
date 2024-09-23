import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const permissions = pgTable("permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export default permissions;
