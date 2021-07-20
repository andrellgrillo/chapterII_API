import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };

// COMPLETE adicionar coluna de avatar na tabela de usuarios
// COMPLETE refatorar usuario com coluna avatar
// COMPLETE configuração uploader multer
// COMPLETE criar a regra de negócio do upload
// COMPLETE criar controller
