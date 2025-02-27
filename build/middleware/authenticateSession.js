"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSession = authenticateSession;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateSession(req, res, next) {
    var _a;
    console.log("Cookies recibidas:", req.cookies);
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
