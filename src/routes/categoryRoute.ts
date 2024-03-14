import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { categoryCreateSchema } from "../schemas/category.schema";
import { CategoryMiddleware } from "../middlewares/categoryMiddlware";

export const categoryRouter = Router();
const categoryRouteController = new CategoryController();
const categoryMiddleware = new CategoryMiddleware();

categoryRouter.post(
  "/",
  categoryMiddleware.validateBody(categoryCreateSchema),
  categoryRouteController.create
);

categoryRouter.delete(
  "/:categoryId",
  categoryMiddleware.categoryExist,
  categoryRouteController.delete
);
