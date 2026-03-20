import { Router } from "express";
import { servicoController } from "../controllers/servico.controllers.js";

const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

 const router = Router()
router.get(ServiceRoute.getAll, servicoController.getAll)
router.get(ServiceRoute.getById, servicoController.get)
router.post(ServiceRoute.create, servicoController.create)
router.put(ServiceRoute.update, servicoController.update)
router.delete(ServiceRoute.delete, servicoController.delete)


export  { router }