const OPERATION_CODES = {
  SUCCESS: {
    code: "000",
    status: 200,
    message: "The operation was successful.",
  },
  INVALID_BODY: {
    code: "001",
    status: 400,
    message: "The request body is missing or empty in the API request.",
  },
  INVALID_BODY_FIELDS: {
    code: "002",
    status: 400,
    message:
      "Some required fields or parameters are missing or invalid in the API request body.",
  },
  RECORD_ID_MISSING: {
    code: "003",
    status: 400,
    message:
      "The record ID is missing or invalid. Please provide a valid record ID.",
  },
  UNAUTHORIZED: {
    code: "004",
    status: 401,
    message:
      "Unauthorized access. Please provide valid authentication credentials.",
  },
  FORBIDDEN: {
    code: "005",
    status: 403,
    message: "Access to the requested resource is forbidden.",
  },
  NOT_FOUND: {
    code: "006",
    status: 404,
    message: "The requested resource could not be found.",
  },
  CONFLICT: {
    code: "007",
    status: 409,
    message: "A conflict occurred while processing the request.",
  },
  BAD_REQUEST: {
    code: "008",
    status: 400,
    message: "The request could not be processed due to a client error.",
  },
  TOO_MANY_REQUESTS: {
    code: "009",
    status: 429,
    message:
      "The request was not processed due to the rate limit of the API endpoint.",
  },
  INTERNAL_SERVER_ERROR: {
    code: "099",
    status: 500,
    message:
      "An unexpected error occurred on the server. Please try again later.",
  },
};

export type OperationCodeT = keyof typeof OPERATION_CODES;

export { OPERATION_CODES };
