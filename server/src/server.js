const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");

const server = express();

server.use(morgan("dev"));
server.use(cookies());
server.use(express.json());
server.use(cors());

server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

server.use("/api", router);

module.exports = server;
