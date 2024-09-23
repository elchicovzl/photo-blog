import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const userTypes = pgTable("user_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
});
