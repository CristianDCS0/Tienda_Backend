"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../db");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;
const cookieSecure = process.env.NODE_ENV === "production";
const cookieSameSite = process.env.SAME_SITE;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const c = yield db_1.connect.connect();
        const passwordHash = bcrypt_1.default.hashSync(req.body.password, 10);
        const newUser = Object.assign(Object.assign({}, req.body), { password: passwordHash });
        const insert = yield c.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email", [newUser.name, newUser.email, newUser.password]);
        c.release();
        const pay = insert.rows[0];
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ pay }, jwtSecret, { expiresIn: jwtExpire || '1h' });
        res.cookie('token', token, 
        //@ts-ignore
        { httpOnly: true, secure: cookieSecure, sameSite: cookieSameSite, maxAge: 1000 * 60 * 60 });
        res.status(201).json({ message: "Registro exitoso" });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const c = yield db_1.connect.connect();
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const result = yield c.query("SELECT id, name, email, password FROM users WHERE email = $1", [email]);
        c.release();
        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const user = result.rows[0];
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        delete user.password;
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ user }, jwtSecret, { expiresIn: jwtExpire || '1h' });
        res.cookie('token', token, 
        //@ts-ignore
        { httpOnly: true, secure: cookieSecure, sameSite: cookieSameSite, maxAge: 1000 * 60 * 60 });
        res.status(200).json({ message: 'Login successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});
exports.login = login;
const logout = (_req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout exitoso' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error logging out' });
    }
};
exports.logout = logout;
