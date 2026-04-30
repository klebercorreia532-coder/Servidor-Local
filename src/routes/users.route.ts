import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import  authMiddleware, {authorize, isOwner}  from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";
import { UserModel } from "../models/users.model.js";


const userRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    resetPassword: "/reset-password/:id",
    login: "/login"
}



const router = Router()
router.post(userRouter.login,UserController.login)
router.post(userRouter.create, UserController.create)

router.use(authMiddleware)

router.put(userRouter.resetPassword, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UserController.resetPassword)
router.get(userRouter.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UserController.getById)
router.put(userRouter.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), isOwner(UserModel, "id"), UserController.update)
router.get(userRouter.getAll, authorize([Role.ADMIN]), UserController.getAll)
router.delete(userRouter.delete, authorize([Role.ADMIN]), isOwner(UserModel, "id"), UserController.delete)

export { router }

