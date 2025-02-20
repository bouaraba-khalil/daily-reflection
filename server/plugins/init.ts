import { envSchema } from "../utils/validate_env";

export default defineNitroPlugin((nitroApp) => {
  console.info("🔥 Running before Nuxt server starts!");
  envSchema.parse(process.env);
});
