import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokenRepository();

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_Id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_Id, token);

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
