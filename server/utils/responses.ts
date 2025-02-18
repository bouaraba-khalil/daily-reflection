import { H3Event } from "h3";

export class CustomResponse {
  message: string = "";
  status: number = 400;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

export function unAuthorized(e: H3Event) {
  return { data: new CustomResponse("unauthorized", 401) };
}
