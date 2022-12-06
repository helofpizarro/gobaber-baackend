import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UserController from '../controllers/UserController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multer)
usersRouter.post('/',celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
}), usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
