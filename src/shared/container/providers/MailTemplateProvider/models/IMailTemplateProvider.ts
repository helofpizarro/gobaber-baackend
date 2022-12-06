import IParseMailTemplateProviderDTO from "../dtos/IParseMailTemplateDTO"

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateProviderDTO): Promise<string>
}