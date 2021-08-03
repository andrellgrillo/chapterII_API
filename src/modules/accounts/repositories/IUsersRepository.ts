import { ICreatedUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "../infra/typeorm/entities/Users";

interface IUsersRepository {
  create(data: ICreatedUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
