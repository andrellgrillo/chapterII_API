import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreatedUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
  }: ICreatedUsersDTO): Promise<void> {
    const emailExist = await this.usersRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email already exist!");
    }
    const password_hash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      password: password_hash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
