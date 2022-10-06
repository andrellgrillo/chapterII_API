import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implementations/DayjsDateProvider";
import { MailProviderinMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswortMailUseCase } from "./sendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswortMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryinMemory: UsersTokenRepositoryInMemory
let mailProvider: MailProviderinMemory;

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokenRepositoryinMemory = new UsersTokenRepositoryInMemory();
    mailProvider = new MailProviderinMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswortMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryinMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "avzonbop@ospo.pr",
      name: "Blanche Curry",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("avzonbop@ospo.pr");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ka@uj.pr")
    ).rejects.toEqual(new AppError("User does not exists!"))
  });

  it("should be able to create an users token", async() => {
    const generateTokenMail = jest.spyOn(usersTokenRepositoryinMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abome@ospo.pr",
      name: "Leon Perkins",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("abome@ospo.pr");
    expect(generateTokenMail).toBeCalled();
  });
});