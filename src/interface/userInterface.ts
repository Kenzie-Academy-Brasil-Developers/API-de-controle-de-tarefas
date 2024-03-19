import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userReturnSchema,
} from "../schemas/userSchema";

type userCreate = z.infer<typeof userCreateSchema>;
type userLogin = z.infer<typeof userLoginSchema>;
type userReturn = z.infer<typeof userReturnSchema>;

type loginRetorn = { accessToken: string; user: userReturn };

export { userCreate, userLogin, userReturn, loginRetorn };
