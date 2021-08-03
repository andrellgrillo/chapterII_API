import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreatedUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreatedUsersDTO): Promise<User> {
    const emailExist = await this.usersRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email already exist!");
    }
    const password_hash = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      password: password_hash,
      email,
      driver_license,
    });
    return user;
  }
}

export { CreateUserUseCase };
