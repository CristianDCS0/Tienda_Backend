"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prueba_controller_1 = require("../controllers/prueba.controller");
const router = (0, express_1.Router)();
router.route('/despedida').get(prueba_controller_1.despedida);
exports.default = router;
