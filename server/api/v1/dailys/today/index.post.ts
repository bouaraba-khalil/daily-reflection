import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/database";
import { dailysTable } from "~/server/database/schema/dailys";

const dailySchema = z.object({
  what_went_well_today: z.string().optional(),
  what_to_improve: z.string().optional(),
  tomorrow_plan: z.string().optional(),
});

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, dailySchema.parse);

  const user_id = e.context.user.id;
  const date = new Date().toISOString();

  const keys = Object.keys(body);

  for (let key of keys) {
    const keyTyped = key as keyof typeof body;
    if (!body[keyTyped]) {
      delete body[keyTyped];
    }
  }
  const where = and(
    eq(dailysTable.user_id, user_id),
    eq(dailysTable.date, date)
  );

  const exist = (await db.select().from(dailysTable).where(where))[0];

  if (exist) {
    return (
      await db
        .update(dailysTable)
        .set({ ...body, user_id })
        .where(where)
        .returning()
    )[0];
  }

  return (
    await db
      .insert(dailysTable)
      .values({ ...body, user_id, date })
      .returning()
  )[0];

  // const exist = await db
  //   .select()
  //   .from(dailysTable)
  //   .where(and(eq(dailysTable.user_id, user_id)));
});
