import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;
// Bearer fsd
if (!authHeader) {
return res.status(401).json({ message: "Token de autenticação ausente" });
}

const token = authHeader.split(" ")[1];

try {
const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);

next();
} catch (error) {
return res.status(401).json({ message: "Token inválido" });
}

}
/*
    req:{
        headers:{
            authorization: "Bearer token"   
}
}

*/