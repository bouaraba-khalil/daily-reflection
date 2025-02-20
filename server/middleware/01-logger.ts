export default defineEventHandler((e) => {
  // ignore frontend
  if (!e.node.req.url?.startsWith("/api")) return;
  console.info(
    new Date().toISOString(),
    " ",
    e.node.req.method,
    ":",
    e.node.req.url
  );
});
