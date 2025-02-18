export function unAuthorized() {
  throw createError({ status: 401, statusText: "unauthorized" });
}
export function not_found() {
  throw createError({ status: 400, statusText: "not found" });
}
