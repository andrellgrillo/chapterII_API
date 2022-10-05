import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswortMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswortMailController();
const resetPasswordController = new ResetPasswordUserController

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle );
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };