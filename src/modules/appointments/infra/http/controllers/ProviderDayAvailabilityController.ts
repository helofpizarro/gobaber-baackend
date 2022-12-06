import {Request, Response} from 'express'
import {container} from 'tsyringe'

import ListProvidersDayAvailabilityService from '@modules/appointments/services/ListProvidersDayAvailabilityService'


export default class ProviderMonthAvailabilitycontroller {
   public async index(request: Request, response: Response): Promise<Response>{
    const {provider_id} = request.params 
    const { month, year, day} = request.body

  
    const listProvidersDayAvailability = container.resolve(ListProvidersDayAvailabilityService)

    const availability = await   listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year
    })
  
  
    return response.json(availability) 
   } 
} 