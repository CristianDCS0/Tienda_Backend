import { Router } from "express";
import { login, logout, register } from "../controllers/auth/auth.controller";
import { authenticateSession } from "../middleware/authenticateSession";

const router = Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
//@ts-ignore
router.route('/auth/logout').get(authenticateSession, logout);

export default router;