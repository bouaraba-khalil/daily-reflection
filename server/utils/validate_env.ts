import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  SALT_ROUND: z.string().refine((val) => !isNaN(Number(val))),
  JWT_SECRET: z.string(),
});

export { envSchema };
