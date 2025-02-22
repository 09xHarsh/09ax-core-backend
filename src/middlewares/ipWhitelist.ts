import { Request, Response, NextFunction } from "express";
import ResponseHelper from "../helpers/response";

const WHITELISTED_IPS = new Set(
  (process.env.WHITELISTED_IPS || "").split(",").map((ip) => ip.trim()),
);

export const ipWhitelistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let clientIp =
    (req.headers["x-forwarded-for"] as string) ||
    req.ip ||
    req.socket.remoteAddress;

  if (!clientIp) {
    ResponseHelper.error({ res, name: "FORBIDDEN" });
    return;
  }

  if (clientIp.includes(",")) {
    clientIp = clientIp.split(",")[0].trim();
  }

  const normalizedIp = clientIp.replace(/^::ffff:/, "");
  if (!WHITELISTED_IPS.has(normalizedIp)) {
    ResponseHelper.error({ res, name: "FORBIDDEN" });
    return;
  }

  next();
};
