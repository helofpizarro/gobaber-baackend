import {Request, Response} from 'express'
import { parseISO } from 'date-fns'
import {container} from 'tsyringe'

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService'


export default class ProviderAppointmentController {
   public async index(request: Request, response: Response): Promise<Response>{
    const provider_id = request.user.id
    const { day,month, year } = request.body

  
    const listProviderAppointment = container.resolve(ListProviderAppointmentService)
  
    const appointment = await listProviderAppointment.execute({
      provider_id,
      day,
      month,
      year
    })
  
    return response.json(appointment) 
   } 
} 