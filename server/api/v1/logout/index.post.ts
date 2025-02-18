export default defineEventHandler(async (e) => {
  deleteCookie(e, authToken);
  return { success: true };
});
