import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  token: z.string(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

const userCreateSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

const userReturnSchema = userSchema.omit({ password: true, token: true });

const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
});

export { userCreateSchema, userSchema, userLoginSchema, userReturnSchema };
