import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string,
  password: string
}

@injectable()
class ResetPassworduserUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError("Token invalid!")
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.now())) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id)
    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokenRepository.deleteById(userToken.id)

  } 
}

export { ResetPassworduserUseCase }