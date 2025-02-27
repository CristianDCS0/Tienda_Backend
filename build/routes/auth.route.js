"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const authenticateSession_1 = require("../middleware/authenticateSession");
const router = (0, express_1.Router)();
router.route('/auth/register').post(auth_controller_1.register);
router.route('/auth/login').post(auth_controller_1.login);
//@ts-ignore
router.route('/auth/logout').get(authenticateSession_1.authenticateSession, auth_controller_1.logout);
exports.default = router;
