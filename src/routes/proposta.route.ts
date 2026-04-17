
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import authMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.models.js"

const PropostaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    update: "/:id",
    delete: "/:id"
}
const router = Router()

router.use(authMiddleware)

router.post(PropostaRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PropostaController.create)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR,  Role.EMPRESA]), isOwner(PropostaModel , "Owner"),PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),isOwner(PropostaModel , "Owner"),PropostaController.delete)

router.get(PropostaRoute.getAll, authorize([Role.ADMIN]), PropostaController.getAll)
router.get(PropostaRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR,Role.CLIENTE, Role.EMPRESA]), PropostaController.get)

export { router }
