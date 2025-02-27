import {Request, Response} from "express";
import {pool} from '../db';

export const postgres = async (_req: Request, res: Response) => {
    const con = await pool.connect();
    const result = await con.query("SELECT * FROM users");
    res.json(result.rows);
}