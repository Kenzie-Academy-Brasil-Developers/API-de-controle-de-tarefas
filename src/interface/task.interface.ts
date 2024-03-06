import { z } from "zod";

import {
  taskCreateSchema,
  taskReturnSchema,
  taskSchema,
  taskUpdateSchema,
} from "../schemas/task.schema";

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;
type TaskReturn = z.infer<typeof taskReturnSchema>;
type TaskSchema = z.infer<typeof taskSchema>;

export { TaskCreate, TaskUpdate, TaskReturn, TaskSchema };
// interface/task.interface.ts

// interface/task.interface.ts
