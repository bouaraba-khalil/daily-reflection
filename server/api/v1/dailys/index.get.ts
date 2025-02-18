import { eq } from "drizzle-orm";
import { db } from "~/server/database";
import { dailysTable } from "~/server/database/schema/dailys";

export default defineEventHandler(async (e) => {
  const user_id = e.context.user.id;
  return await db
    .select()
    .from(dailysTable)
    .where(eq(dailysTable.user_id, user_id));
});
