import { Router } from "express";
import {
    handleSelecionarServico,
    handleSelecionarPrestador,
    handleCriarPrestador,
    handleCalcularOrcamento
} from "./orcamento.controller.js";

const router = Router();

router.post("/orcamento/servico", handleSelecionarServico);
router.post("/orcamento/prestador", handleSelecionarPrestador);
router.post("/orcamento/prestador/create", handleCriarPrestador);
router.post("/orcamento/calcular", handleCalcularOrcamento);

export default router;