// src/routes/user.router.ts

import { Router } from "express";
import {
    handleGetUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", handleGetUsers);
router.get("/:id", handleGetUserById);
router.post("/", handleCreateUser);
router.put("/:id", handleUpdateUser);
router.delete("/:id", handleDeleteUser);

export default router;


