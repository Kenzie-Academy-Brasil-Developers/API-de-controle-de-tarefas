import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/prisma";
import { AnyZodObject } from "zod";

export class CategoryMiddleware {
  public categoryExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const categoryId = req.params.categoryId;

    const categoryFind = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!categoryFind) {
      throw new AppError("Category not found", 404);
    }

    // Preservar o conteúdo anterior de res.locals
    res.locals = {
      ...res.locals,
      categoryFind: categoryFind,
    };

    return next();
  };

  public validateBody =
    (schema: AnyZodObject) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };
}
