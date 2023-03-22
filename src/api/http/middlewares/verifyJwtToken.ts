import {Request, Response, NextFunction} from "express";
import {verifyJwtToken} from "../../../config/jwt";
import {User} from "../../models/user";


export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
            code: 401
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyJwtToken(token);
        const user = await User.findByPk(payload["userId"]);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                code: 401
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            code: 401
        });
    }
}
