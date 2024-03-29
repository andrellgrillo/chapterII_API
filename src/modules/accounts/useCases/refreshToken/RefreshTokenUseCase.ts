import auth from "@config/auth"
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {

  }
  async exeucte(token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = decode.sub;
    const email = decode.email;
    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!");
    }
    
    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.usersTokenRepository.create({ 
      expires_date, 
      refresh_token, 
      user_id})

    return refresh_token;
  }
}

export { RefreshTokenUseCase }