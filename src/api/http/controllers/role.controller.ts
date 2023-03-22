import {Request, Response} from "express";
import Role from "../../models/role";


export function getRoles(req: Request, res: Response) {
    Role.findAll().then(roles => {
        res.json(roles);
    });
}

export function getRoleById(req: Request, res: Response) {
    Role.findByPk(req.params.id).then(role => {
        res.json(role);
    });
}

export function createRole(req: Request, res: Response) {
    Role.create(req.body).then(role => {
        res.json(role);
    });

}

export function updateRole(req: Request, res: Response) {
    Role.findByPk(req.params.id).then(role => {
        role.update(req.body).then(role => {
            res.json(role);
        });
    });

}

export function deleteRole(req: Request, res: Response) {
    Role.findByPk(req.params.id).then(role => {
        role.destroy().then(role => {
            res.json(role);
        });
    });

}