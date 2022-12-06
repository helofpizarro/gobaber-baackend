import { injectable, inject } from 'tsyringe'
import {getDate, getDaysInMonth } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointimentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array< {
  day: number
  available: boolean 
}>

@injectable()
class ListMounthProviderAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepository
  ) 
    
  {}

  public async execute({ provider_id, month, year }: IRequestDTO): Promise<IResponse> {
    const appointment = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month
    })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

      const eachDayArray = Array.from(
        {length: numberOfDaysInMonth},
        (_, index) => index + 1
      )

    const availability = eachDayArray.map(day => {
       const appointmentInDay = appointment.filter(appointment => {
        return getDate(appointment.date) === day
       }) 
       return {
        day,
        available: appointmentInDay.length < 10
       }
    }) 
    
  return availability      

  }
}

export default ListMounthProviderAvailabilityService