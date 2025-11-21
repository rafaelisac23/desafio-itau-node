import { NextFunction, Request, Response } from "express";
import { bodyTransacao } from "../types/transacaoTypes";
import { readFile, writeFile } from "fs/promises";

export const addTransacao = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = bodyTransacao.parse(req.body);

    const fileContent = await readFile("./trans.txt", {
      encoding: "utf-8",
    });

    const jsonContent = JSON.parse(fileContent);
    jsonContent.push(body);

    const jsonString = JSON.stringify(jsonContent);

    await writeFile("./trans.txt", jsonString);

    res.status(201).json({});
  } catch (err: any) {
    next(err);
  }
};
