"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_controller_1 = require("../controllers/db.controller");
const router = (0, express_1.Router)();
router.route('/pg').get(db_controller_1.postgres);
exports.default = router;
