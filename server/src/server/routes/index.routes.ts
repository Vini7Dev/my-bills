import { Router } from 'express'

import billRoutes from './bill.routes'
import sectionRoutes from './section.routes'
import userRoutes from './user.routes'

const appRoutes = Router()

appRoutes.use('/users', userRoutes)
appRoutes.use('/sections', sectionRoutes)
appRoutes.use('/bills', billRoutes)

export default appRoutes
