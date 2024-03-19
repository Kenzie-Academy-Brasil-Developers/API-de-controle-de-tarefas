import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService = new TaskService();

  public createTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = Number(res.locals.decoded.sub);
    console.log(id);
    const body = req.body;
    const newTask = await this.taskService.create(body, id);
    return res.status(201).json(newTask);
  };

  public findOneTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const taskId = Number(req.params.taskId);
    const task = await this.taskService.findOne(taskId);
    return res.status(200).json(task);
  };

  public findManyTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = Number(res.locals.decoded.sub);
    const category = req.query.category
      ? String(req.query.category)
      : undefined;
    return res.status(200).json(await this.taskService.findMany(category, id));
  };

  public updateTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const taskId = Number(req.params.taskId);
    const updatedTask = await this.taskService.updateTask(taskId, req.body);
    return res.status(200).json(updatedTask);
  };

  public deleteTask = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const params = Number(request.params.taskId);
    const task = await this.taskService.delete(params);
    return response.status(204).json(task);
  };
}
