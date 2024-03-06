import { task } from "./../tests/mocks/tasks.mocks";
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService = new TaskService();

  public createTask = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response
      .status(201)
      .json(await this.taskService.createTask(request.body));
  };

  public getAllTask = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(200).json(await this.taskService.getAllTask());
  };

  public updateTask = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response
      .status(200)
      .json(
        await this.taskService.updateTask(
          parseInt(request.params.taskId),
          request.body
        )
      );
  };

  public getById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response
      .status(201)
      .json(await this.taskService.getById(request.body));
  };

  public deleteTask = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response
      .status(204)
      .json(await this.taskService.deleteTask(request.body));
  };
}
