import { ZodError } from "zod";

export default defineNitroErrorHandler((error, event) => {
  if (error.data instanceof ZodError) {
    const errors = error.data.issues.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));
    return send(event, JSON.stringify({ errors }), "application/json");
  }
  
  console.error(error);
  return send(
    event,
    JSON.stringify({ error: "internal server Error" }),
    "application/json",
  );
});
