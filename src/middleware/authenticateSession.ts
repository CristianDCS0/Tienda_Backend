import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticateSession(req: Request, res: Response, next:NextFunction){
    console.log("Cookies recibidas:", req.cookies);
    const token = req.cookies?.token;
    
    if (!token) {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        (req as any).user = jwt.verify(token, process.env.JWT_SECRET as string);
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}