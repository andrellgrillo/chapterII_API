import { SendForgotPasswortMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswortMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle );

export { passwordRoutes };