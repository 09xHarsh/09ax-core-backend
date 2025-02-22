import { Response } from "express";
import { OPERATION_CODES } from "./data";

type ApiCodeMapT = keyof typeof OPERATION_CODES;

class ResponseHelper {
  static success({
    res,
    message,
    data,
  }: {
    res: Response;
    message?: string;
    data?: any;
  }) {
    try {
      const foundCode = OPERATION_CODES["SUCCESS"];
      const responseBody = {
        code: foundCode.code,
        message: message || foundCode.message,
        ...(data !== undefined && { data }),
      };

      return res.status(foundCode.status).json(responseBody);
    } catch (err: any) {
      return res.status(500).json({
        code: OPERATION_CODES["INTERNAL_SERVER_ERROR"].code,
        message: OPERATION_CODES["INTERNAL_SERVER_ERROR"].message,
        ...(data !== undefined && { data }),
      });
    }
  }

  static error({
    name,
    res,
    message,
    data,
  }: {
    name: ApiCodeMapT;
    res: Response;
    message?: string;
    data?: any;
  }) {
    try {
      const foundCode = OPERATION_CODES[name as ApiCodeMapT];
      const responseBody = {
        code: foundCode.code,
        message: message || foundCode.message,
        ...(data !== undefined && { data }),
      };
      return res.status(foundCode.status).json(responseBody);
    } catch (err: any) {
      return res.status(500).json({
        code: OPERATION_CODES["INTERNAL_SERVER_ERROR"].code,
        message: OPERATION_CODES["INTERNAL_SERVER_ERROR"].message,
        ...(data !== undefined && { data }),
      });
    }
  }
}

export default ResponseHelper;
