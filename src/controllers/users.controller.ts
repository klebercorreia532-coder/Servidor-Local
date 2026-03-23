

import type { Request, Response } from "express";
import {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
} from "../models/users.model.js";

export async function handleGetUsers(req: Request, res: Response) {
    const users = await getUsers();
    res.json(users);
}

export async function handleGetUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await getUserById(id as string);

    if (!user) {
        return res.status(404).json({
            status: "error",
            mensagem: "Utilizador não encontrado",
        });
    }

    res.json(user);
}

export async function handleCreateUser(req: Request, res: Response) {
    const user = req.body;

    if (!user.nome || !user.email || !user.password) {
        return res.status(400).json({
            status: "error",
            mensagem: "Dados obrigatórios em falta",
        });
    }

    const result = await insertUser(user);

    res.status(201).json({
        status: "success",
        mensagem: "Utilizador criado",
        data: result,
    });
}

export async function handleUpdateUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;

    const result = await updateUser(id as string, user);

    if (!result) {
        return res.status(404).json({
            status: "error",
            mensagem: "Utilizador não encontrado",
        });
    }

    res.json({
        status: "success",
        mensagem: "Utilizador atualizado",
    });
}

export async function handleDeleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const result = await deleteUser(id as string);

    if (!result) {
        return res.status(404).json({
            status: "error",
            mensagem: "Utilizador não encontrado",
        });
    }

    res.json({
        status: "success",
        mensagem: "Utilizador apagado",
    });
}