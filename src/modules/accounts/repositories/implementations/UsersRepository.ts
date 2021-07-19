import { getRepository, Repository } from "typeorm";

import { ICreatedUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/Users";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreatedUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });
    await this.repository.save(user);
  }
}

export { UsersRepository };
