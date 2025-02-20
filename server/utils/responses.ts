import { H3Event } from "h3";

export function unAuthorized() {
  throw createError({ status: 401, statusText: "unauthorized" });
}
export function not_found() {
  throw createError({ status: 400, statusText: "not found" });
}

export function redirectLogin(e: H3Event) {
  deleteCookie(e, authToken);
  return sendRedirect(e, "/login", 302);
}
