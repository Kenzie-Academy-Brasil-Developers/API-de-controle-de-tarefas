import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

// verificação  de endereços de e-mail
export class UserValidate {
  public uniqueEmail = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;

    if (!email) return next();

    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (foundUser) {
      throw new AppError("This email is already registered.", 409);
    }
    return next();
  };
}
export const userValidate = new UserValidate();
