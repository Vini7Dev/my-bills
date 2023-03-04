import { Router } from 'express'

import { UsersController } from '../../controllers/UsersController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersController = new UsersController()

const userRoutes = Router()

userRoutes.post('/', usersController.create)

userRoutes.get('/:id', ensureAuthenticated, usersController.show)

userRoutes.patch('/:id', ensureAuthenticated, usersController.update)

userRoutes.delete('/:id', ensureAuthenticated, usersController.delete)

export default userRoutes
