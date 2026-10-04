import "dotenv/config"
import { createServer } from "http"

import express from "express"
import cors from 'cors';

import authRouter from "./routes/auth.routes.js"

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

server.listen(PORT, () => {
  console.log("сервер работает!");
})
