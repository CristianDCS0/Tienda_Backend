"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hello_controller_1 = require("../controllers/hello.controller");
const authenticateSession_1 = require("../middleware/authenticateSession");
const router = (0, express_1.Router)();
//@ts-ignore
router.route('/saludo').get(authenticateSession_1.authenticateSession, hello_controller_1.saludo);
exports.default = router;
