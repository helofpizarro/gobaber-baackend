import {Request, Response} from 'express'
import {container} from 'tsyringe'

import ListProvidersMounthAvailabilityService from '@modules/appointments/services/ListProvidersMounthAvailabilityService'


export default class ProviderMonthAvailabilitycontroller {
   public async index(request: Request, response: Response): Promise<Response>{
    const {provider_id} = request.params 
    const { month, year} = request.body

  
    const listProvidersMounthAvailability = container.resolve(ListProvidersMounthAvailabilityService)

    const providers = await   listProvidersMounthAvailability.execute({
      provider_id,
      month,
      year
    })
  
  
    return response.json(providers) 
   } 
} 