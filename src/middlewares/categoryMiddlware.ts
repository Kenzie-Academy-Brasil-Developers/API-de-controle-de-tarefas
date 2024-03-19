import { AppError } from "./../errors/AppError";
import { NextFunction, Request, Response } from "express";
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
      include: { user: true },
    });

    if (!categoryFind) {
      throw new AppError("Category not found", 404);
    }

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

  public ensureCategoryOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = res.locals.decodedUser.id;
    const { categoryFind } = res.locals;

    if (categoryFind?.userId !== userId) {
      throw new AppError("This user is not the category owner", 403);
    }

    return next();
  };
}
