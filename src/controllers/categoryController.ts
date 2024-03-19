import { CategoryService } from "../services/categoryService";
import { Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService = new CategoryService();

  public createCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(res.locals.decoded.sub);
    const category = await this.categoryService.create(req.body, userId);
    return res.status(201).json(category);
  };

  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const categoryId = Number(req.params.categoryId);
    await this.categoryService.delete(categoryId);
    return res.status(204).send();
  };
}
