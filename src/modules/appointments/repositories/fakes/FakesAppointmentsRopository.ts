import {uuid} from 'uuidv4'
import Appointment from '../../infra/typeorm/entities/Appointment'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointimentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

// Data Transfer Object

class AppointmentsRepository implements IAppointmentsRepository  {
    private appointment: Appointment[] = []


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointment.find(appointment =>
      isEqual(appointment.date, date),
    )

    return findAppointment
  }
  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointment.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id && 
          getMonth(appointment.date) + 1 === month && 
          getYear(appointment.date) === year
        )
      }
      
       
    )

    return appointments
  }

  public async findAllInDayFromProvider({provider_id, month, year, day}: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointment.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id && 
          getMonth(appointment.date) + 1 === month && 
          getDate(appointment.date)  === day && 
          getYear(appointment.date) === year
        )
      }
      
       
    )

    return appointments
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment =  new Appointment()

    Object.assign(appointment, {id: uuid(), date, provider_id, user_id})
 

    this.appointment.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
