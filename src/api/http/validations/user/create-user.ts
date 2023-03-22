import {body} from 'express-validator';
import {User} from "../../../models/user";
import Role from "../../../models/role";

const createUserValidator = [
    body('name').isLength({min: 3, max: 30}).withMessage('Name must be between 3 and 30 characters'),
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password').isLength({min: 8, max: 200}).withMessage('Password must be between 8 and 200 characters'),
    body('email').custom(async (value) => {
        let user = await User.findOne({where: {email: value}});
        if (user) {
            return Promise.reject('E-mail already in use');
        }
        return true;
    }),
    body('roleId').custom(async (value) => {
        let role = await Role.findByPk(value);
        if (!role) {
            return Promise.reject('Role not found');
        }
        return true;
    })
];

export {createUserValidator};
