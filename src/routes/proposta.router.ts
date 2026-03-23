import { Router } from "express";

import { propostaController } from "../controllers/proposta.controller.js";


const PropostaRoute = {
    create: "/create",
    getById: "/get-by-id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}


const router = Router();

// POST /propostas
router.post(PropostaRoute.create, propostaController.create );

export default router;