import { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export const notFoundRequest: RequestHandler = (req, res) => {
  res.status(404).json({
    error: "Route Not Found",
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = err.issues
      .filter(
        (issue) => issue.path[0] === "valor" || issue.path[0] === "dataHora"
      )
      .map((issue) => issue.message);

    if (errors)
      return res.status(422).json({
        error: "Erro de validação",
        message: errors,
      });

    return res.status(400).json({
      error: "Erro de validação",
      issues: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  res.status(500).json({
    error: "Internal server error",
  });
};
