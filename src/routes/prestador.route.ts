

import { Router } from "express"
import { prestadorController } from "../controllers/prestador.control.js"
import authMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"


const prestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(prestadorRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), prestadorController.getAll)
router.get(prestadorRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), prestadorController.getById)
router.post(prestadorRoute.create,authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), prestadorController.create)

router.use(authMiddleware)
router.put(prestadorRoute.update, authorize([Role.ADMIN]), prestadorController.update)
router.delete(prestadorRoute.delete, authorize([Role.ADMIN]), prestadorController.delete)


export { router }