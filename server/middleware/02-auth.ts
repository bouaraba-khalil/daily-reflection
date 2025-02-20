import { authToken, decodeToken } from "../utils/jwt";
import { redirectLogin } from "../utils/responses";

const baseUrl = "/api/v1";
const apiPublicPath = ["/login", "/signup"].map((url) => baseUrl + url);

export default defineEventHandler(async (e) => {
  const path = e.node.req.url;

  //ignore frontend
  if (!path?.startsWith("/api")) {
    return;
  }
  if (apiPublicPath.includes(path!)) {
    return;
  }
  const bearer = getCookie(e, authToken);

  if (!bearer) redirectLogin(e);
  const [, token] = bearer!.split(" ");

  try {
    const data = await decodeToken(token);
    e.context.user = data as { id: number; email: string };
  } catch {
    redirectLogin(e);
  }
});
