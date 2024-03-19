import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { JwtPayload, verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

// autenticação e  validação de um token

class AuthMiddleware {
  public validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Token is required", 401);
    }

    const [_bearer, token] = authorization.split(" ");

    if (!token) {
      throw new AppError("Token is required", 401);
    }
    const secretKey = process.env.JWT_SECRET!;
    const decoded = verify(token, secretKey);

    const foundUser = await prisma.user.findFirst({
      where: { id: Number(decoded.sub) },
    });

    if (!foundUser) {
      throw new AppError("Category not found!", 404);
    }

    res.locals = { ...res.locals, decoded, decodedUser: foundUser };

    next();
  };
}
export default AuthMiddleware;
