import { IMailProvider } from "../IMailProvider";



class MailProviderinMemory implements IMailProvider {
  message: any[] = []

  async sendMail(to: string, subject: string, variable: any, path: string): Promise<void> {
    this.message.push({
      to, subject, variable, path
    });
  }

}

export { MailProviderinMemory };