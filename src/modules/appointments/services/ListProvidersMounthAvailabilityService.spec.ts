import FakeAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRopository'
import ListProviderMonthAvailabilityService from './ListProvidersMounthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the month availability from provider ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 24, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 25, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 26, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2022, 6, 27, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2022,
      month: 7,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 24, available: true },
        { day: 25, available: false },
        { day: 26, available: true },
        { day: 27, available: true },
      ]),
    )
  })
})