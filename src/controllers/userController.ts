import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService = new UserService();

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const userLogin = await this.userService.login(req.body);
    return res.status(200).json(userLogin);
  };

  public getUserById = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    const id = res.locals.id;
    const userProfile = await this.userService.getUserById(id);
    return res.status(200).json(userProfile);
  };
}
