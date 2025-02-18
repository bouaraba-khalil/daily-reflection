import { H3Event } from "h3";
import { authToken, decodeToken, isValid } from "../utils/jwt";
import { unAuthorized } from "../utils/responses";

const baseUrl = "/api/v1";
const publicPath = ["/login", "/signup"].map((url) => baseUrl + url);

export default defineEventHandler(async (e) => {
  const path = e.node.req.url;
  if (publicPath.includes(path!)) {
    return;
  }
  const bearer = getCookie(e, authToken);
  if (!bearer) unAuthorized(e);
  const [, token] = bearer!.split(" ");

  try {
    const data = await decodeToken(token);
    e.context.user = data as { id: number; email: string };
  } catch {
    unAuthorized(e);
  }
});
