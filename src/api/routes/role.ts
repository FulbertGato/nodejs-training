import express from "express";
import {createRole, deleteRole, getRoleById, getRoles, updateRole} from "../http/controllers/role.controller";

import {checkUserRole} from "../http/middlewares/hasRole";

const router = express.Router();

router.route("/").get(getRoles);
router.route("/:id").get(checkUserRole(['admin','superadmin']),getRoleById);
router.post("/", checkUserRole(['admin','superadmin']),createRole);
router.put("/:id", checkUserRole(['superadmin']),updateRole);
router.delete("/:id", checkUserRole(['superadmin']),deleteRole);


export default router;

