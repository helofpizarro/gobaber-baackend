import { getRepository, Repository, Raw } from 'typeorm'

import Appointment from '../entities/Appointment'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointimentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

// Data Trnasfer Object

class AppointmentsRepository implements IAppointmentsRepository  {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment 
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProvider): Promise<Appointment[]> {
      const parseMonth = String(month).padStart(2, '0')

    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => 
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`  
        )
      }
    })
       

    return appointment
  }
  public async findAllInDayFromProvider({provider_id, month, year, day}: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parseday = String(day).padStart(2, '0')
    const parseMonth = String(month).padStart(2, '0')

  const appointment = await this.ormRepository.find({
    where: {
      provider_id,
      date: Raw(dateFieldName => 
        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseday}-${parseMonth}-${year}'`  
      )
    }
  })
     
  
  return appointment
}

  public async create({provider_id, date, user_id}: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date, user_id})

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
