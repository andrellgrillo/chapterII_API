import { ICreatedUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/Users";

interface IUsersRepository {
  create(data: ICreatedUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
