import {inject, injectable} from 'tsyringe'
import path from 'path'
// import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
// import IHashProvider from '../providers/HashProvider/models/IHashProvider'


interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

  ) {}
    
  public async execute({email}: IRequest): Promise<void> {
      const user = await this.userRepository.findByEmail(email)

      if(!user){
        throw new AppError('User does not exist ')
      }

    const {token }  = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    )

      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
           file: forgotPasswordTemplate,
           variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
           } 
        }
      }) 
  
  }
}

export default SendForgotPasswordEmailService
