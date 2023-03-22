import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Role from "../../../models/role";


export const createRoleValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .custom(async (value, { req }) => {
            const existingRole = await Role.findOne({ where: { name: value } });
            if (existingRole) {
                throw new Error("Name must be unique");
            }
        }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
