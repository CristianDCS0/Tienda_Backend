import {Router} from "express";
import { saludo } from "../controllers/hello.controller";

const router = Router();

router.route('/saludo').get(saludo);

export default router;