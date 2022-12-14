import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";



export default class FakMailProvider implements IMailProvider {
  private message: ISendMailDTO[] = []

  public async  sendMail(message: ISendMailDTO): Promise<void> {
    this.message.push(message)
  }
}