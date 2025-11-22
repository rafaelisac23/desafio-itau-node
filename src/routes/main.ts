import express from "express";
import * as controllerTransacao from "../controllers/transacoes";

const router = express.Router();

router.post("/transacao", controllerTransacao.addTransacao);
router.delete("/transacao", controllerTransacao.deleteTransacao);
router.get("/transacao", controllerTransacao.deleteTransacao);

export default router;
