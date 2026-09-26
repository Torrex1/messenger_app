import "dotenv/config"

import express from "express";
import { createServer } from "http";
import authRouter from "./routes/auth.routes.js"
import { json } from "stream/consumers";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001

app.use(express.json());

app.use("/api/auth", authRouter);

server.listen(PORT, () => {
  console.log("сервер работает!");
})
