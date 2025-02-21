import {Router} from "express";
import { despedida } from "../controllers/prueba.controller";

const router = Router();

router.route('/despedida').get(despedida);

export default router;