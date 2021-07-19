import { ICreatedUsersDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreatedUsersDTO): Promise<void>;
}

export { IUsersRepository };
