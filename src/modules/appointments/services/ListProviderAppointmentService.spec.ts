import FakeAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRopository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ListProviderAppointmentService from './ListProviderAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider
let listProviderAppointment: ListProviderAppointmentService

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointment = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list the appointment on a speccific day ', async () => {
   const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provder',
      user_id: '123123',
      date: new Date(2022, 4, 20, 14, 0, 0),
    })

   const appointment2 =  await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: '123123',
      date: new Date(2022, 4, 20, 15, 0, 0),
    })

  

  
    const appointment = await listProviderAppointment.execute({
      provider_id: 'provider',
      year: 2022,
      month: 5,
      day: 20,
    })

    expect(appointment).toEqual([
      appointment1,
      appointment2
    ])
  })  
})
