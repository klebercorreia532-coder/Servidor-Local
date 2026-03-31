import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import { authMiddleware } from "../security/auth.middleware.js";


const userRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login"
}



const router = Router()

router.post(userRouter.login, UserController.login)

router.post(userRouter.create, UserController.create)

router.get(userRouter.getAll, authMiddleware, UserController.getAll)

router.get(userRouter.getById, UserController.getById)

router.put(userRouter.update, UserController.update)

router.delete(userRouter.delete, UserController.delete)

export { router }

