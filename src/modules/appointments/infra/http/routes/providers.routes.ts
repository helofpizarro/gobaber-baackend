import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersConroller from '../controllers/ProvidersController'
import ProvidersMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProvidersDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'


const providersRouter = Router()
const providersController = new ProvidersConroller()
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController()
const providersDayAvailabilityController = new ProvidersDayAvailabilityController()

providersRouter.use(ensureAuthenticated)
providersRouter.get('/', providersController.index) 
providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }  

}) ,providersMonthAvailabilityController.index) 
providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }  

}) ,providersDayAvailabilityController.index) 
  


export default providersRouter
