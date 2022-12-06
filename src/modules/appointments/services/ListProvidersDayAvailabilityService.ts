import { injectable, inject } from 'tsyringe'
import {getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointimentsRepository'

interface IRequestDTO {
  day: number
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListDayProviderAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day
  }: IRequestDTO): Promise<IResponse>{
    const appointment = await this.appointmentRepository.findAllInDayFromProvider(
        {
        provider_id,
        day,
        month,
        year,
      }
    )

    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )
    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointment.find(appointment => getHours(appointment.date) === hour)


      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
      }
    })
    return availability
   
    
  }
  
}

export default ListDayProviderAvailabilityService