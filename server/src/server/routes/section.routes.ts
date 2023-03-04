import { Router } from 'express'

import { SectionsController } from '../../controllers/SectionsController'

const sectionsController = new SectionsController()

const sectionRoutes = Router()

sectionRoutes.post('/', sectionsController.create)

export default sectionRoutes
