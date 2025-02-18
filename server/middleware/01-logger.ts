export default defineEventHandler((e) => {
  console.log(
    new Date().toISOString(),
    " ",
    e.node.req.method,
    ":",
    e.node.req.url
  );
});
