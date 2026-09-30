import "dotenv/config"

import express from "express"
import authRouter from "./routes/auth.routes.js"
import cors from 'cors';

import { createServer } from "http"

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

server.listen(PORT, () => {
  console.log("сервер работает!");
})
