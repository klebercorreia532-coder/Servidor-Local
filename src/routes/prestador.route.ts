

import { Router } from "express"
import { prestadorController } from "../controllers/prestador.control.js"


const pretadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(pretadorRoute.create, prestadorController.create)
router.get(pretadorRoute.getAll, prestadorController.getAll)

export { router }