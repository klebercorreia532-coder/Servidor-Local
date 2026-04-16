import { de } from "date-fns/locale";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    // Bearer fsd
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação ausente" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string; email: string; role: string };

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }


        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
// RBAC - Role Based Access Control
export function authorize(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "permissao insuficiente" });
        }
        next();
    }

}

export function isOwner(model: any, field: string) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const userId = req.user?.id
        const { id } = req.params
        const entity = await model.get(id)

        if (!entity) return res.status(404).json({ message: "Entidade não encontrada" });

        if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

        if (entity[field] !== userId) return res.status(403).json({ message: "Permissão insuficiente" });

        next();
    }
        }

/*
    req:{
        headers:{
            authorization: "Bearer token"   
}
}

*/