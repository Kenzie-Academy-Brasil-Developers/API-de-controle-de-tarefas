import { z } from "zod";

import {
  taskCreateSchema,
  taskReturnSchema,
  taskSchema,
  taskCategoryReturn,
} from "../schemas/task.schema";

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskReturnCategory = z.infer<typeof taskCategoryReturn>;
type TaskUpdate = Partial<TaskCreate>;
type TaskReturn = z.infer<typeof taskReturnSchema>;
type TaskSchema = z.infer<typeof taskSchema>;

export { TaskCreate, TaskUpdate, TaskReturn, TaskSchema, TaskReturnCategory };
