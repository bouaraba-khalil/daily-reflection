export default defineEventHandler(async (e) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return { id: e.context.user.id, email: e.context.user.email };
});
