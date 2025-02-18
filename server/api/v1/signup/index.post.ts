import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";
import { db } from "~/server/database";
import { usersTable } from "~/server/database/schema/user";
import bcrypt from "bcrypt";

const userSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "email is required" }),
  password: z
    .string({ message: "password is required" })
    .min(6, { message: "password is too short" }),
});

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, userSchema.parse);
  const exist = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, body.email));

  if (exist.length) {
    throw {
      data: new ZodError([
        {
          path: ["email"],
          message: "email already exist",
          code: "invalid_string",
          validation: "email",
        },
      ]),
    };
  }
  const user = await createUser(body);

  return user;
});

async function createUser({ email, password }: z.infer<typeof userSchema>) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND!));
  const hash_password = await bcrypt.hashSync(password, salt);
  return (
    await db
      .insert(usersTable)
      .values({ email, password: hash_password, salt })
      .returning({ id: usersTable.id, email: usersTable.email })
  )[0];
}
