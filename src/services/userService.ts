import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { userReturnSchema } from "../schemas/userSchema";
import {
  loginRetorn,
  userCreate,
  userLogin,
  userReturn,
} from "../interface/userInterface";
import { AppError } from "../errors/AppError";

export class UserService {
  //cria um novo usuario no banco de dados.
  public create = async (payload: userCreate): Promise<userReturn> => {
    payload.password = await hash(payload.password, 10);
    return userReturnSchema.parse(await prisma.user.create({ data: payload }));
  };

  //autenticar um usuario com base no email senha
  public login = async ({
    email,
    password,
  }: userCreate): Promise<loginRetorn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }
    const hasSamePassword = await compare(password, foundUser.password);

    if (!hasSamePassword) {
      throw new AppError("Email and password doesn't match", 401);
    }
    const secretKey = process.env.JWT_SECRET!;
    const expiresIn = process.env.EXPIRES_IN!;

    const token = jwt.sign({}, secretKey, {
      expiresIn: "1h",
      subject: foundUser.id.toString(),
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(foundUser),
    };
  };

  //obtm as informacoes de um usuario,id
  public getUserById = async (userId: number): Promise<userReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { id: userId } });
    return userReturnSchema.parse(foundUser);
  };
}
