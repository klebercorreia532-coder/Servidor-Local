import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacaoservico.controller.js"
import { Role } from "../utils/types.js"
import { authorize } from "../security/auth.middleware.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN,Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN]), PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN]), PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.CLIENTE,Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN]), PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getPrestacaoServicoDetalhada, authorize([Role.ADMIN]), PrestacaoServicoController.getPrestacaoServicoDetalhada)

export { router }