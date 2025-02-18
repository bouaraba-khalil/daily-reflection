import { and, eq } from "drizzle-orm";
import { db } from "~/server/database";
import { dailysTable } from "~/server/database/schema/dailys";
import { not_found } from "~/server/utils/responses";

export default defineEventHandler(async (e) => {
  const user_id = e.context.user.id;
  const date = new Date().toISOString();

  const where = and(
    eq(dailysTable.user_id, user_id),
    eq(dailysTable.date, date)
  );

  const exist = (await db.select().from(dailysTable).where(where))[0];
  if (!exist) not_found();
  return exist;
});
