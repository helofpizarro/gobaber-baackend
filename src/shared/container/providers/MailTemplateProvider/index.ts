import { container } from 'tsyringe'

import IMailTemplatePrivder from './models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplatePrivder>(
  'MailTemplateProvider',
  providers.handlebars,
)