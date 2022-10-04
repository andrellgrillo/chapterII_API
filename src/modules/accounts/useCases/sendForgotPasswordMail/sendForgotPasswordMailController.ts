import { Request, response, Response } from "express"
import { container } from "tsyringe"
import { SendForgotPasswortMailUseCase } from "./sendForgotPasswordMailUseCase"

class SendForgotPasswortMailController {
  async handle(req: Request, res: Response): Promise<Response>{
    const { email } = req.body;
    const sendForgotPasswortMailUseCase = container.resolve(
      SendForgotPasswortMailUseCase
    );

    await sendForgotPasswortMailUseCase.execute(email)

    return response.send();
  }
}

export { SendForgotPasswortMailController }