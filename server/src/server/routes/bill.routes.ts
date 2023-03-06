import { Router } from 'express'

import { BillsController } from '../../controllers/BillsController'
import { ProfileBillsController } from '../../controllers/ProfileBillsController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const billsController = new BillsController()

const profileBillsController = new ProfileBillsController()

const billRoutes = Router()

billRoutes.use(ensureAuthenticated)

billRoutes.post('/', billsController.create)

billRoutes.patch('/:id', billsController.update)

billRoutes.delete('/:id', billsController.delete)

billRoutes.get('/me', profileBillsController.index)

export default billRoutes
