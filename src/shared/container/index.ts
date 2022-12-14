import {container} from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointimentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'


container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)