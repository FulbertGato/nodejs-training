import {Request, Response} from "express";
import {User} from "../../models/user";
import {validationResult} from "express-validator";
import {UserResource} from "../resources/user.resource";

export function getUsers(req: Request, res: Response) {
    User.findAll().then(users => {
        res.json(UserResource.collection(users));
    });
}

export function getUserById(req: Request, res: Response) {
    User.findByPk(req.params.id).then(user => {
        if (user) {
            res.json(new UserResource(user));
        } else {
            res.status(404).json({
                message: 'User not found',
                code: 404
            });
        }
    });

}

export async function createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            errors: errors.array(),
            code: 400
        });
    }
    req.body.password = await User.hashPassword(req.body.password);
    User.create(req.body).then(user => {
        res.status(201).json(new UserResource(user));
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error creating user',
            code: 500
        });
    })
}
