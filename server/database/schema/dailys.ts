import {
  date,
  index,
  integer,
  pgTable,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const dailysTable = pgTable(
  "dailys",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => usersTable.id),
    date: date().notNull(),
    what_went_well_today: text(),
    what_to_improve: text(),
    tomorrow_plan: text(),
  },
  (table) => [
    index("user_date_idx").on(table.user_id, table.date),
    unique("user_date_unique").on(table.user_id, table.date),
  ]
);
