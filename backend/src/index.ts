import "dotenv/config"

import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

server.listen(process.env.PORT, () => {
  console.log("сервер работает!");
})
