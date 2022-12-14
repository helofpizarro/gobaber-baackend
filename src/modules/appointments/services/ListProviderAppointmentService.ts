import { injectable, inject } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointimentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
  day: number
}



@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
    

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
) {}

  public async execute({ provider_id, month, year, day }: IRequestDTO): Promise<Appointment[]> {
        const cacheKey = `provider-appointmenst:${provider_id}: ${year}-${month}-${day}`
        let appointments = await this.cacheProvider.recover<Appointment[]>(
          cacheKey,
          )  

         if(!appointments){
          appointments = await this.appointmentRepository.findAllInDayFromProvider({
            provider_id, month, year, day
          })

          await this.cacheProvider.save(cacheKey, appointments)
         }   

    

        
    return appointments    
  }
}

export default ListProviderAppointmentService