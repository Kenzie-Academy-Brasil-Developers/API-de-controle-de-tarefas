import { z } from "zod";
import { categorySchema } from "./category.schema";

const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
});

const taskCreateSchema = taskSchema.omit({ id: true });
const taskUpdateSchema = taskSchema.omit({ id: true }).partial();
const taskReturnSchema = taskSchema
  .extend({
    category: categorySchema.nullish(),
  })
  .omit({ categoryId: true });

export { taskCreateSchema, taskUpdateSchema, taskReturnSchema, taskSchema };
