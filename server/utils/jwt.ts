import jwt from "jsonwebtoken";
import { H3Event } from "h3";

export const authToken = "Authorization";

export async function signToken(
  payload: {
    id: number;
    email: string;
  },
  expiresIn: number
) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
}

export async function signTokenWithCookie(
  e: H3Event,
  user: {
    id: number;
    email: string;
  }
) {
  const expiresIn = 6 * 60 * 60; // token live for 6h in second format
  const maxAge = Date.now() + expiresIn * 1000; // cookie live for 6h in timestamp format

  const token = await signToken(user, expiresIn);

  setCookie(e, authToken, `Bearer ${token}`, {
    // httpOnly: true,
    // secure: true,
    maxAge,
  });
}

export async function decodeToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
export async function isValid(token: string) {
  try {
    decodeToken(token);
    return true;
  } catch {
    return false;
  }
}
