export default defineEventHandler(async (e) => {
  return { id: e.context.user.id, email: e.context.user.email };
});
