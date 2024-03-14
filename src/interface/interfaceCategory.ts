import { z } from "zod";
import { categoryCreateSchema } from "../schemas/category.schema";

type createCategory = z.infer<typeof categoryCreateSchema>;

export { createCategory };
