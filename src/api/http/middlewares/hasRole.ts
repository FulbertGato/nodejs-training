import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../../../config/jwt";
import { User } from "../../models/user";

export const checkUserRole = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
            code: 401,
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyJwtToken(token);
        const userId = payload["userId"];
        const user = await User.findByPk(userId, { include: ["role"] });

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                code: 401,
            });
        }

        const roleName = user.role?.name;

        if (!allowedRoles.includes(roleName)) {
            return res.status(403).json({
                message: "Forbidden",
                code: 403,
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            code: 401,
        });
    }
};
