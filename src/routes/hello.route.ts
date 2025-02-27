import {Router} from "express";
import { saludo } from "../controllers/hello.controller";
import { authenticateSession } from "../middleware/authenticateSession";

const router = Router();

//@ts-ignore
router.route('/saludo').get(authenticateSession, saludo);

export default router;