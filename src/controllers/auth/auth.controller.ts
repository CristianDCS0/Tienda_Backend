import { Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connect } from "../../db";
import { User } from "../../models/User";

const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;
const cookieSecure = process.env.NODE_ENV === "production";
const cookieSameSite = process.env.SAME_SITE;

export const register = async(req: Request, res: Response) => {
    try {
        const c = await connect.connect();
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser: User = {...req.body, password: passwordHash};
        const insert = await c.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email", 
            [newUser.name, newUser.email, newUser.password]);
        c.release();
        const pay = insert.rows[0];
        //@ts-ignore
        const token = jwt.sign({pay}, jwtSecret, {expiresIn: jwtExpire || '1h'});
        
        res.cookie('token', token, 
            //@ts-ignore
            { httpOnly: true, secure: cookieSecure, sameSite: cookieSameSite, maxAge: 1000 * 60 * 60 }
        );
        res.status(201).json({message: "Registro exitoso"});
    } catch (error) {
        res.status(500).json({error: 'Error creating user'});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const c = await connect.connect();
        
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = await c.query("SELECT id, name, email, password FROM users WHERE email = $1", [email]);
        c.release();
    
        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = result.rows[0];

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        delete user.password;
        
        //@ts-ignore
        const token = jwt.sign({user}, jwtSecret, {expiresIn: jwtExpire || '1h'});
        
        res.cookie('token', token, 
            //@ts-ignore
            { httpOnly: true, secure: cookieSecure, sameSite: cookieSameSite, maxAge: 1000 * 60 * 60 }
        );

        res.status(200).json({message: 'Login successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

export const logout = (_req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout exitoso' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error logging out' });
    }
}