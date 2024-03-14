import { CategoryService } from "../services/categoryService";
import { Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService = new CategoryService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const categoryData = req.body;
    const category = await this.categoryService.create(categoryData);
    return res.status(201).json(category);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const categoryId = Number(req.params.categoryId);
    await this.categoryService.delete(categoryId);
    return res.status(204).send();
  };
}
