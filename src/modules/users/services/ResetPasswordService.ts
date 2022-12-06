import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUserTokenRepository from '../repositories/IUserTokensRepository'
import IUsersRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

// import User from '../infra/typeorm/entities/User'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashprovider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashprovider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService