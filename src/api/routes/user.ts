import {Router} from "express";
import {createUser, getUsers} from "../http/controllers/user.controller";
import {createUserValidator} from "../http/validations/user/create-user";

const router = Router();


router.get("/",getUsers);
router.get("/:id",getUsers);
router.post("/",createUserValidator,createUser);

export default router;


