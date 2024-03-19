import { z } from "zod";
import { categorySchema } from "./category.schema";

const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
});
const taskSchemaCreate = taskSchema.pick({
  title: true,
  content: true,
  categoryId: true,
});
const taskCreateSchema = taskSchema.omit({ id: true });

const taskReturnSchema = taskSchema
  .extend({
    category: categorySchema.nullish(),
  })
  .omit({ categoryId: true });

const taskCategoryReturn = taskSchema.extend({
  category: categorySchema.nullish().optional(),
});

const taskUpdateSchema = taskCreateSchema.partial().omit({ categoryId: true });

export {
  taskSchemaCreate,
  taskUpdateSchema,
  taskReturnSchema,
  taskSchema,
  taskCategoryReturn,
};
