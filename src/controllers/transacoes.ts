import { NextFunction, Request, RequestHandler, Response } from "express";
import { bodyTransacao, bodyTransacaoType } from "../types/transacaoTypes";
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

export const deleteTransacao: RequestHandler = async (req, res) => {
  await writeFile("./trans.txt", "[]");
  res.status(200).json({});
};

export const getEstatisticas: RequestHandler = async (req, res) => {
  const now = Date.parse("2025-08-07T12:34:56.789-03:00");
  const oneMinute = 60 * 1000;
  const timeLessOneMinute = now - oneMinute;

  let count = 0;
  let sum = 0;
  let avg = 0;
  let min = 0;
  let max = 0;

  //   console.log("Data sem um minuto: ", timeLessOneMinute);

  const fileContent = await readFile("./trans.txt", {
    encoding: "utf-8",
  });

  const jsonContent: bodyTransacaoType[] = JSON.parse(fileContent);

  for (const item of jsonContent) {
    let t = Date.parse(item.dataHora.toString());

    if (t >= timeLessOneMinute && t <= now) {
    }
  }

  res.json({ count, sum, avg, min, max });
};
