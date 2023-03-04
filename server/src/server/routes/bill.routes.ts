import { Router } from 'express'

import { BillsController } from '../../controllers/BillsController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const billsController = new BillsController()

const billRoutes = Router()

billRoutes.use(ensureAuthenticated)

billRoutes.get('/', billsController.index)

billRoutes.post('/', billsController.create)

billRoutes.patch('/:id', billsController.update)

billRoutes.delete('/:id', billsController.delete)

export default billRoutes
