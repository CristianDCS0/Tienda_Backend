import {Request, Response} from "express";

export const despedida = (_req: Request, res: Response) => {
    res.json({'mensaje': "adios"});
}