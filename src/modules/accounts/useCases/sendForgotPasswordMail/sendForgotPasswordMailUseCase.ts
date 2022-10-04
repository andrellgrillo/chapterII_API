import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswortMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError("User does not exist!")
    }
    
    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);
    
    await this.usersTokenRepository.create({
      expires_date,
      refresh_token: token,
      user_id: user.id
    });
    
    await this.mailProvider.sendMail(email, "Recuperação de sebga", `O link para o reset é ${token}`)
  }
}

export { SendForgotPasswortMailUseCase }