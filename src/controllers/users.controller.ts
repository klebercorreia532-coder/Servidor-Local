

import type { Request, Response } from "express"
import type {ResponseType, UserType } from "../utils/types.js"
import { UserModel } from "../models/users.model.js"
// import { comparePasswoerd} from "../utils/password.js"
import jwt from "jsonwebtoken"
import { comparePassword } from "../utils/password.js"

export const UserController = {
    async create(req: Request, res: Response) {
        const user: UserType = req.body

        if (!user) {
            res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        console.log(user)

        const createUserResponse= await UserModel.create(user)

        res.json(createUserResponse)
    },

    async getAll(req: Request, res: Response) {
        const getAllUsersResponse = await UserModel.getAll()

        if (!getAllUsersResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizadores buscados com sucesso",
            data: getAllUsersResponse
        })
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getUserByIdResponse: UserType | null = await UserModel.get(id as string)

        if (!getUserByIdResponse) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: getUserByIdResponse
        })

    },


    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedUser: UserType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        const updateUserResponse = await UserModel.update(id as string, updatedUser)

        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse
        })
    },
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Dados de login invalidos",
                data: null
            })
        }
        const userData = await UserModel.getByEmail(email as string)
        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        const isPasswordValid = await comparePassword(password, userData.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais invalidas",
                data: null
            })
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            roles: userData.role

        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" }

        );
        return res.status(200).json({
            status: "success",
            message: "Login realizado com sucesso",
            data: { token }
        })
    },

    async resetPassword(req: Request, res: Response) {
        const { id } = req.params

        const updatedUser: UserType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        const getUserByIdResponse = await UserModel.get(id as string)

        if (!getUserByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        const comparePasswordResponse = await comparePassword(updatedUser.password, getUserByIdResponse.password)

        if (!comparePasswordResponse) {
            return res.status(400).json({
                status: "error",
                message: "Password antiga invalida",
                data: null
            })
        }

        const resetPasswordResponse = await UserModel.resetPassword(id as string, updatedUser.password)

        if (!resetPasswordResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: resetPasswordResponse
        })
    },

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
            
            
        }

        const deleteUserResponse: UserType | null = await UserModel.delete(id as string)

        if (!deleteUserResponse) {
            const response:ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null
            }
            return res.status(400).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        })
    }
}
