import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacaoservico.controller.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getPrestacaoServicoDetalhada, PrestacaoServicoController.getPrestacaoServicoDetalhada)

export { router }