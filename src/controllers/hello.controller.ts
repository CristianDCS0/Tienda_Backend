import {Request, Response} from "express";

export const saludo = (_req: Request, res: Response) => {
    res.json({'mensaje': "Mas pruebas", 'fecha': new Date()});
}