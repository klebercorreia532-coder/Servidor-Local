import { Router } from "express"
import { servicoController } from "../controllers/servico.controllers.js"
import { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"


const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllServiceDetalhada: "/detalhada"
}

const router = Router()

router.post(ServiceRoute.create,authorize([Role.ADMIN]), servicoController.create,authorize([Role.ADMIN]))
router.get(ServiceRoute.getAll,authorize([Role.ADMIN]), servicoController.getAll)
router.get(ServiceRoute.getById,authorize([Role.ADMIN]), servicoController.get)
router.put(ServiceRoute.update,authorize([Role.ADMIN]), servicoController.update)
router.delete(ServiceRoute.delete,authorize([Role.ADMIN]), servicoController.delete)
router.get(ServiceRoute.getAllServiceDetalhada,authorize([Role.ADMIN]), servicoController.getAllServiceDetalhada)

export { router }