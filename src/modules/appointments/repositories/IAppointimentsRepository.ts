import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO'
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
    create(date: ICreateAppointmentsDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
    findAllInMonthFromProvider(data: IFindAllInMonthFromProvider): Promise<Appointment[]>
    findAllInDayFromProvider(data: IFindAllInDayFromProvider): Promise<Appointment[]>
}