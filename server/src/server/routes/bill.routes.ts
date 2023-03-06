import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../config/upload'

import { BillsController } from '../../controllers/BillsController'
import { ImportBillsPDFController } from '../../controllers/ImportBillsPDFController'
import { ProfileBillsController } from '../../controllers/ProfileBillsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const uploadPDF = multer(uploadConfig);

const billsController = new BillsController()

const profileBillsController = new ProfileBillsController()

const importBillsPDFController = new ImportBillsPDFController()

const billRoutes = Router()

billRoutes.use(ensureAuthenticated)

billRoutes.post('/', billsController.create)

billRoutes.patch('/:id', billsController.update)

billRoutes.delete('/:id', billsController.delete)

billRoutes.get('/me', profileBillsController.index)

billRoutes.post('/import', uploadPDF.single('file'), importBillsPDFController.create)

export default billRoutes
