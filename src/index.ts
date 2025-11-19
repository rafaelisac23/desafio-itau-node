import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import router from "./routes/main";
import { errorHandler, notFoundRequest } from "./error";

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "./public")));
server.use("/", router);
server.use(notFoundRequest);
server.use(errorHandler);

server.listen(3000, () => {
  console.log(`Servidor Rodando na Porta http://localhost:3000`);
});
