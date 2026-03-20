import type { UserType } from "../utils/types.js"





export const usersController = {
    async create(req: Request, res: Response) {
        const newUser: UserType = req.body

        if (!newUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        const createUserResponse = await usersModel.create(newUser)
       if (createUserResponse === null) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao criar utilizador",
            data: null
        })
    }   
    res.status(200).json({
        status: "success",
        message: "Utilizador criado com sucesso",
        data: createUserResponse
    }
        }
}