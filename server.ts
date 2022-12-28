import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import Logging from "./src/lib/Logging";
import subscriberRoute from './src/routes/subscriberRoute'

const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


/**DB Connection */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connection established");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Connection failed");
    Logging.error(error);
  });

/**Progress if MONGO connects */
const StartServer = () => {
  router.use((req, res, next) => {
    /**Log Request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /**Log Response */
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  /**API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-with, Content-Type,Accept,Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
      return res.status(200).json({});
    }

    next();
  });
};

/**Routes */
router.use("/subscribers", subscriberRoute);

/**Connection check */
router.use("/", (req, res, next) => {
  res.status(200).json({ message: "pong" });
});

/**Handling Error */
router.use((req, res, next) => {
  const error = new Error("Not found");
  Logging.error(error);

  return res.status(404).json({ message: error.message });
});

http
  .createServer(router)
  .listen(config.server.port, () =>
    Logging.info(`Server running on (${config.server.port})`)
  );
