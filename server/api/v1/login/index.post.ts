import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";
import { db } from "~/server/database";
import { usersTable } from "~/server/database/schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const user = await findUser(body);
  const expiresIn = 6 * 60 * 60; // token live for 6h in second format
  const maxAge = Date.now() + expiresIn * 1000; // cookie live for 6h in timestamp format

  const token = await signToken(user, expiresIn);

  setCookie(e, "Authorization", `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
    maxAge,
  });

  return user;
});

async function findUser({ email, password }: z.infer<typeof userSchema>) {
  const user = (
    await db.select().from(usersTable).where(eq(usersTable.email, email))
  )?.[0];
  const same = await bcrypt.compareSync(password, user.password);

  if (!same) {
    throw {
      data: new ZodError([
        {
          path: ["email"],
          message: "wrong email/password combinaison",
          code: "invalid_string",
          validation: "email",
        },
      ]),
    };
  }
  return { id: user.id, email: user.email };
}

async function signToken(
  payload: { id: number; email: string },
  expiresIn: number
) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
}
