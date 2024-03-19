import { Router } from "express";
import { UserController } from "../controllers/userController";
import { userValidate } from "../middlewares/userValidate";
import { taskMiddlewaressure } from "../middlewares/taskMiddlewares";
import { userCreateSchema, userLoginSchema } from "../schemas/userSchema";
import AuthMiddleware from "../middlewares/authMiddleware";

export const userRouter = Router();

const userController = new UserController();
const authMiddleware = new AuthMiddleware();
userRouter.post(
  "/",
  taskMiddlewaressure.validateBody(userCreateSchema),
  userValidate.uniqueEmail,
  userController.createUser
);

userRouter.post(
  "/login",
  taskMiddlewaressure.validateBody(userLoginSchema),
  userController.loginUser
);

userRouter.get(
  "/profile",
  authMiddleware.validateToken,
  userController.getUserById
);
