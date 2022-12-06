import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendoForgortPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendoForgortPasswordEmail = container.resolve(SendoForgortPasswordEmailService)


     await sendoForgortPasswordEmail.execute({
      email,
    })

  

  return response.status(204).json()
  
    }  
}