import { z } from "zod";

import {
  taskSchemaCreate,
  taskReturnSchema,
  taskCategoryReturn,
  taskUpdateSchema,
} from "../schemas/task.schema";

type taskCreate = z.infer<typeof taskSchemaCreate>;
type taskReturnCategory = z.infer<typeof taskCategoryReturn>;
type taskUpdate = z.infer<typeof taskUpdateSchema>;
type taskReturn = z.infer<typeof taskReturnSchema>;

export { taskCreate, taskUpdate, taskReturn, taskReturnCategory };
