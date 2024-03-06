import { prisma } from "../database/prisma";
import { taskReturnSchema } from "../schemas/task.schema";
import {
  TaskCreate,
  TaskSchema,
  TaskUpdate,
} from "../interface/task.interface";

export class TaskService {
  // Método para criar uma nova tarefa
  createTask = async (payload: TaskCreate): Promise<TaskSchema> => {
    return taskReturnSchema.parse(await prisma.task.create({ data: payload }));
  };

  // Método para obter todas as tarefas
  getAllTask = async (): Promise<Array<TaskSchema>> => {
    return taskReturnSchema.array().parse(await prisma.task.findMany());
  };

  // Método para atualizar uma tarefa existente
  updateTask = async (id: number, payload: TaskUpdate): Promise<TaskSchema> => {
    const update = await prisma.task.update({
      where: { id: Number(id) },
      data: payload,
    });
    return taskReturnSchema.parse(update);
  };

  // Método para obter uma única tarefa pelo ID
  getById = async (id: number): Promise<TaskSchema | null> => {
    const singleTask = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    return singleTask;
  };

  // Método para excluir uma tarefa existente
  deleteTask = async (taskId: Number): Promise<void> => {
    await prisma.task.delete({ where: { id: Number(taskId) } });
  };
}
