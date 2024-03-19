import { Category } from "@prisma/client";
import { createCategory } from "../interface/interfaceCategory";
import { prisma } from "../database/prisma";

interface CreateCategoryPayload extends createCategory {
  categoryId: number;
}

export class CategoryService {
  async create(
    payLoad: CreateCategoryPayload,
    userId: number
  ): Promise<Category> {
    return await prisma.category.create({ data: { ...payLoad, userId } });
  }

  async delete(categoryId: number): Promise<void> {
    await prisma.category.delete({ where: { id: categoryId } });
  }
}
