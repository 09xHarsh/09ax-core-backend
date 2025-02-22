import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const requestId = uuidv4();
  const clientIp = Array.isArray(req.headers["x-forwarded-for"])
    ? req.headers["x-forwarded-for"][0].trim()
    : (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      req.ip;

  logger.info(
    `[REQUEST] ${requestId} ${clientIp} -method: ${req.method} -url: ${
      req.originalUrl
    } -headers: ${JSON.stringify(req.headers)} body: ${JSON.stringify(
      req.body,
    )}`,
  );

  // Capture response body
  const oldSend = res.send;
  let responseBody: any;

  res.send = function (body) {
    responseBody = body;
    return oldSend.call(res, body);
  };

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? "error" : "info";
    logger[logLevel](
      `[RESPONSE] ${requestId} - time: ${responseTime}ms -method: ${req.method} -url: ${req.originalUrl} ` +
        `-status: ${res.statusCode} ` +
        `-headers: ${JSON.stringify(res.getHeaders())} ` +
        `-body: ${JSON.stringify(responseBody)}`,
    );
  });

  next();
};

export { requestLogger };
