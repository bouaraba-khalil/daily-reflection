import { ZodError } from "zod";
import { CustomResponse } from "./utils/responses";

export default defineNitroErrorHandler((error, event) => {
  if (error.data instanceof ZodError) {
    const errors = error.data.issues.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));
    return send(event, JSON.stringify({ errors }), "application/json");
  }

  if (error.data instanceof CustomResponse) {
    setResponseStatus(event, error.data.status);
    return send(event, error.data.message, "text/plain");
  }

  console.error(error);
  return send(
    event,
    JSON.stringify({ error: "internal server Error" }),
    "application/json"
  );
});
