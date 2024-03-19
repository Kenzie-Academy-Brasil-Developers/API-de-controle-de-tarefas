import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { taskSchemaCreate, taskUpdateSchema } from "../schemas/task.schema";
import { TaskMiddlewares } from "../middlewares/taskMiddlewares";
import AuthMiddleware from "../middlewares/authMiddleware";

export const taskRouter = Router();

const taskController = new TaskController();

const taskMiddlewares = new TaskMiddlewares();

const authMiddleware = new AuthMiddleware();

taskRouter.post(
  "/",
  authMiddleware.validateToken,
  taskMiddlewares.validateBody(taskSchemaCreate),
  taskMiddlewares.ensureCategoryExists,
  taskController.createTask
);

taskRouter.get("/", authMiddleware.validateToken, taskController.findManyTask);

taskRouter.get(
  "/:taskId",
  authMiddleware.validateToken,
  taskMiddlewares.taskExists,
  taskMiddlewares.UserOwnerTask,

  taskMiddlewares.ensureCategoryExists,
  taskController.findOneTask
);

taskRouter.patch(
  "/:taskId",
  authMiddleware.validateToken,
  taskMiddlewares.taskExists,
  taskMiddlewares.UserOwnerTask,
  taskMiddlewares.validateBody(taskUpdateSchema),
  taskController.updateTask
);

taskRouter.delete(
  "/:taskId",
  authMiddleware.validateToken,
  taskMiddlewares.taskExists,
  taskMiddlewares.UserOwnerTask,
  taskController.deleteTask
);
