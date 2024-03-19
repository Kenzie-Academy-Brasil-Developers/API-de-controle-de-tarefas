import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { categoryCreateSchema } from "../schemas/category.schema";
import { CategoryMiddleware } from "../middlewares/categoryMiddlware";
import AuthMiddleware from "../middlewares/authMiddleware";

export const categoryRouter = Router();
const categoryRouteController = new CategoryController();
const categoryMiddleware = new CategoryMiddleware();
const authMiddleware = new AuthMiddleware();

categoryRouter.post(
  "/",
  authMiddleware.validateToken,
  categoryMiddleware.validateBody(categoryCreateSchema),
  categoryRouteController.createCategory
);

categoryRouter.delete(
  "/:categoryId",
  authMiddleware.validateToken,
  categoryMiddleware.categoryExist,
  categoryMiddleware.ensureCategoryOwner,
  categoryRouteController.deleteCategory
);
