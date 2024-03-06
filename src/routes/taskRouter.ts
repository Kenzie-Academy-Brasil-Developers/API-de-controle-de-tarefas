import { Router } from "express";
import { TaskController } from "../controllers/taskController";

export const taskRouter = Router();

const taskController = new TaskController();

taskRouter.post("/register", taskController.createTask);

taskRouter.get("", taskController.getAllTask);

taskRouter.get("/:taskId", taskController.getById);

taskRouter.patch("/:taskId", taskController.updateTask);

taskRouter.delete("/:taskId", taskController.deleteTask);
