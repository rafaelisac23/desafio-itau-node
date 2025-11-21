import { NextFunction, Request, Response } from "express";
import { bodyTransacao } from "../types/transacaoTypes";

export const addTransacao = (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = bodyTransacao.parse(req.body)

        res.status(200).json({ add: true })

    }
    catch (err: any) {
        next(err);
    }
};
