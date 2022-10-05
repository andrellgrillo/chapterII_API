import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResetPassworduserUseCase } from './ResetPasswordUserUseCase'


class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response>{
    const { token } = req.query;
    const { password } = req.body;
    const resetPassworduserUseCase = container.resolve(ResetPassworduserUseCase);
    await resetPassworduserUseCase.execute({token: String(token), password});
    return res.send()
  } 
}

export { ResetPasswordUserController}