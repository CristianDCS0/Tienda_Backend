import {Router} from "express";

import { postgres } from "../controllers/db.controller";

const router = Router();

router.route('/pg').get(postgres);

export default router;