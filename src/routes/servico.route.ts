import { Router } from "express"
import { servicoController } from "../controllers/servico.controllers.js"
import authMiddleware, { authorize } from "../security/auth.middleware.js"
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

router.get(ServiceRoute.getAllServiceDetalhada,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), servicoController.getAllServiceDetalhada)
router.get(ServiceRoute.getAll,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), servicoController.getAll)
router.get(ServiceRoute.getById,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), servicoController.get)

router.use(authMiddleware)
router.post(ServiceRoute.create,authorize([Role.ADMIN]), servicoController.create)
router.put(ServiceRoute.update,authorize([Role.ADMIN]), servicoController.update)
router.delete(ServiceRoute.delete,authorize([Role.ADMIN]), servicoController.delete)

export { router }
