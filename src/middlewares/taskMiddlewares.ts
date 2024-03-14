import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class TaskMiddlewares {
  //STATUS (404) - Tarefa não encontrada
  // verificar se uma tarefa existe
  public taskExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const taskId = Number(req.params.taskId);

    const taskFind = await prisma.task.findFirst({
      where: { id: Number(taskId) },
      include: { category: true },
    });

    if (!taskFind) {
      throw new AppError("Task not found", 404);
    }
    res.locals.taskFind = taskFind;
    return next();
  };

  // o usuario que fez a requisição seja o proprietario
  public ensureUserIsTaskOwner = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = res.locals.sub;
    const { foundTask } = res.locals;

    if (foundTask?.userId !== userId) {
      throw new AppError("This user is not the task owner", 403);
    }

    return next();
  };

  //STATUS (404) - Categoria não encontrada.
  //  verifica se um id categooria existe
  public ensureCategoryExists = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;
    if (!categoryId) return next();

    const foundCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };
  public validateBody =
    (schema: AnyZodObject) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };
  public UserOwnerTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = Number(res.locals.sub);

    const { task } = res.locals;

    if (task?.userId !== userId) {
      throw new AppError("This user is not the task owner", 403);
    }
    return next();
  };
}
export const taskMiddlewaressure = new TaskMiddlewares();
