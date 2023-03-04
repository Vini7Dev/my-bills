import { Router } from 'express'

import { UsersController } from '../../controllers/UsersController'

const usersController = new UsersController()

const userRoutes = Router()

userRoutes.get('/', usersController.index)

userRoutes.post('/', usersController.create)

userRoutes.put('/:id', usersController.update)

userRoutes.delete('/:id', usersController.delete)

export default userRoutes
