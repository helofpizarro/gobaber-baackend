import FakeAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRopository'
import ListProviderDayAvailabilityService from './ListProvidersDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the day availability from provider ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 6, 20, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 6, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 20, 11).getTime()
    })



    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2022,
      month: 7,
      day: 20,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 8, available: false },
        { day: 9, available: false },
        { day: 10, available: false },
        { day: 11, available: true },
        { day: 14, available: false },
        { day: 15, available: false },
        { day: 16, available: true },
      ]),
    )
  })
})