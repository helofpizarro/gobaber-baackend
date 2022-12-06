import handlebars from 'handlebars'
import fs from 'fs'

import IParseMailTemplateProviderDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlbarsMailTemplateProvider implements IMailTemplateProvider {
   public async parse({
    file, 
    variables
  }: IParseMailTemplateProviderDTO): Promise<string> {
      const templateFileContent = await fs.promises.readFile(file, {
        encoding: 'utf-8'
      })
      const parseTemplate = handlebars.compile(templateFileContent)

      return parseTemplate(variables)
    }

}

export default HandlbarsMailTemplateProvider