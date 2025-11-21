import express from "express";
import * as controllerTransacao from "../controllers/transacoes";

const router = express.Router();

router.post("/transacao", controllerTransacao.addTransacao);

export default router;
