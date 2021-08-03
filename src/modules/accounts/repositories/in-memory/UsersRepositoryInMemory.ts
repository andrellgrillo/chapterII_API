import { ICreatedUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/Users";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreatedUsersDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
