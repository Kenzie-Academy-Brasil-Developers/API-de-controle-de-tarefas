import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrorMiddleware {
  static execute(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
