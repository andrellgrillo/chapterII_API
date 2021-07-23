import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_Id } = verify(
      token,
      "d656ba9f9e0559a1bbb4034095da7aa1"
    ) as IPayload;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_Id);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    request.user = {
      id: user_Id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}
