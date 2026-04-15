import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"
import { Role } from "../utils/types.js"
import authMiddleware, { authorize } from "../security/auth.middleware.js"

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()


router.get(OrcamentoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.get)
router.post(OrcamentoRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.create)
router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.update)

router.use(authMiddleware)
router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN]), OrcamentoController.getAll)
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)
export { router }
