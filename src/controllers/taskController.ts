import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService = new TaskService();

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const id = response.locals.id;
    const body = request.body;
    const newTask = await this.taskService.create(body, id);
    return response.status(201).json(newTask);
  };

  public findOne = async (req: Request, res: Response): Promise<Response> => {
    const taskId = Number(req.body.taskId);
    const task = await this.taskService.findOne(taskId);
    return res.status(200).json(task);
  };

  public findMany = async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(await this.taskService.findMany());
  };

  public updateTask = async (req: Request, res: Response) => {
    const taskId = Number(req.params.taskId);
    const updatedTask = await this.taskService.update(taskId, req.body);
    return res.status(200).json(updatedTask);
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const params = Number(request.params.id);
    const task = await this.taskService.delete(params);
    return response.status(204).json(task);
  };
}
