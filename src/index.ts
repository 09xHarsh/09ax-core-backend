import express from "express";
import logger from "./utils/logger";
import ResponseHelper from "./helpers/response";
import { requestLogger } from "./middlewares/apiLogger";
import { ipWhitelistMiddleware } from "./middlewares/ipWhitelist";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(ipWhitelistMiddleware);

app.get("/", (_, res) => {
  ResponseHelper.success({ res: res });
});

app.use("*", (_, res) => {
  ResponseHelper.error({ res: res, name: "NOT_FOUND" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
