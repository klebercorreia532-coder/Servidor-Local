import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacaoservico.controller.js"
import { Role } from "../utils/types.js"
import { authorize, isOwner } from "../security/auth.middleware.js"
import { PrestacaoServicoModel } from "../models/prestacaoservico.models.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getAll,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),  isOwner(PrestacaoServicoModel, "id_prestador"),  PrestacaoServicoController.update)
router.delete( PrestacaoServicoRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),isOwner(PrestacaoServicoModel, "id_prestador"), PrestacaoServicoController.delete)
router.get( PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada,authorize([Role.ADMIN]), PrestacaoServicoController.getAllPrestacaoServicoDetalhada)
 
export { router }