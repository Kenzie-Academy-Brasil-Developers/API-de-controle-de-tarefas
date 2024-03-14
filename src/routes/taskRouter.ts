import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { TaskMiddlewares } from "../middlewares/taskMiddlewares";

export const taskRouter = Router();

const taskController = new TaskController();

const taskMiddlewares = new TaskMiddlewares();

taskRouter.post(
  "/",
  taskMiddlewares.validateBody(taskCreateSchema),
  taskMiddlewares.ensureCategoryExists,
  taskController.create
);

taskRouter.get("/", taskController.findOne);

taskRouter.use(
  "/:taskId",
  taskMiddlewares.taskExists,
  taskMiddlewares.UserOwnerTask
);

taskRouter.get(
  "/:taskId",
  taskMiddlewares.ensureCategoryExists,
  taskController.findOne,
  taskMiddlewares.ensureUserIsTaskOwner
);

taskRouter.patch(
  "/:taskId",
  taskMiddlewares.validateBody(taskUpdateSchema),
  taskController.updateTask
);

taskRouter.delete("/:taskId", taskController.delete);
