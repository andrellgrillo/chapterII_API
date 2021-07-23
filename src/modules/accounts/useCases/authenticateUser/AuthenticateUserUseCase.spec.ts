import { ICreatedUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreatedUsersDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be authenticate an non exist user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@test.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreatedUsersDTO = {
        driver_license: "999999",
        email: "users@teste.com",
        password: "1234",
        name: "User Tests",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "users@teste.com",
        password: "555555",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
