import { prisma } from "../database/prisma";
import { taskReturnSchema, taskSchema } from "../schemas/task.schema";
import {
  TaskCreate,
  TaskReturnCategory,
  TaskSchema,
  TaskUpdate,
} from "../interface/task.interface";

export class TaskService {
  //  criar uma nova tarefa
  create = async (body: TaskCreate, id: number): Promise<TaskSchema> => {
    return taskSchema.parse(await prisma.task.create({ data: body }));
  };

  //  obter todas as tarefas
  findMany = async (
    categoryName?: string
  ): Promise<Array<TaskReturnCategory>> => {
    const tasks = await prisma.task.findMany({
      where: {
        ...(categoryName && { category: { name: categoryName } }),
      },
      include: { category: true },
    });

    return tasks;
  };

  //  atualizar uma tarefa existente
  update = async (id: number, payload: TaskUpdate): Promise<TaskSchema> => {
    const update = await prisma.task.update({
      where: { id: Number(id) },
      data: payload,
    });
    return taskReturnSchema.parse(update);
  };

  //  obter uma única tarefa pelo ID
  findOne = async (id: number): Promise<TaskSchema | null> => {
    const singleTask = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    return singleTask;
  };

  //  excluir uma tarefa existente
  delete = async (id: number) => {
    await prisma.task.delete({ where: { id } });
  };
}
