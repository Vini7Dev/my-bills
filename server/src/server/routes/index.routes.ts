import { Router } from 'express'

import billRoutes from './bill.routes'

const appRoutes = Router()

appRoutes.use('/bills', billRoutes)

export default appRoutes
