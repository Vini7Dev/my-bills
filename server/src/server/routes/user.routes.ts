import { Router } from 'express'

import { UsersController } from '../../controllers/UsersController'

const usersController = new UsersController()

const userRoutes = Router()

userRoutes.get('/:id', usersController.show)

userRoutes.post('/', usersController.create)

userRoutes.patch('/:id', usersController.update)

userRoutes.delete('/:id', usersController.delete)

export default userRoutes
