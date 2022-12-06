import AppError from '@shared/errors/AppError'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakenotificationsRepositories'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRopository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeNotificationsRepository: FakeNotificationsRepository
let fakeCacheProvider: FakeCacheProvider
let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 6, 25, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2022, 6, 25, 13),
      user_id: 'user-id',
      provider_id: 'provider-id',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider-id')
  })

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 6, 25, 13).getTime()
    })

    const appointmentDate = new Date(2022, 6, 25, 13)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 6, 25, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 25, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 6, 25, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 25, 13),
        user_id: 'same-user-id',
        provider_id: 'same-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 6, 25, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 26, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 26, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  
})