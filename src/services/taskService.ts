import { prisma } from "../database/prisma";
import { taskReturnSchema, taskSchema } from "../schemas/task.schema";
import {
  taskCreate,
  taskUpdate,
  taskReturn,
  taskReturnCategory,
} from "../interface/task.interface";

export class TaskService {
  //  criar uma nova tarefa
  create = async (body: taskCreate, userId: number): Promise<taskReturn> => {
    return taskSchema.parse(
      await prisma.task.create({ data: { ...body, userId } })
    );
  };

  //  obter todas as tarefas
  findMany = async (
    categoryName?: string,
    id?: number
  ): Promise<Array<taskReturnCategory>> => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
        ...(categoryName && { category: { name: categoryName } }),
      },
      include: { category: true },
    });

    return tasks;
  };

  //  atualizar uma tarefa existente
  updateTask = async (id: number, data: taskUpdate): Promise<taskReturn> => {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return taskReturnSchema.parse(task);
  };

  //  obter uma única tarefa pelo ID
  findOne = async (id: number): Promise<taskReturn | null> => {
    console.log(id);
    const singleTask = await prisma.task.findUnique({
      where: {
        id,
      },
      include: { category: true },
    });
    return singleTask;
  };

  //  excluir uma tarefa existente
  delete = async (id: number) => {
    await prisma.task.delete({ where: { id } });
  };
}
