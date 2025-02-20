export default defineEventHandler((e) => {
  if (e.node.req.url?.includes("/api/v1"))
    console.log(
      new Date().toISOString(),
      " ",
      e.node.req.method,
      ":",
      e.node.req.url
    );
});
