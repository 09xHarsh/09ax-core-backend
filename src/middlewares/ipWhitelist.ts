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
  const clientIp = req.ip || req.socket.remoteAddress;

  if (!clientIp) {
    ResponseHelper.error({ res, name: "FORBIDDEN" });
    return;
  }

  const normalizedIp = clientIp.includes("::ffff:")
    ? clientIp.split("::ffff:")[1]
    : clientIp;
  if (!WHITELISTED_IPS.has(normalizedIp)) {
    ResponseHelper.error({ res, name: "FORBIDDEN" });
    return;
  }

  next();
};
