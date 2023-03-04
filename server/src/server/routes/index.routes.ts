import { Router } from 'express'

import billRoutes from './bill.routes'
import userRoutes from './user.routes'

const appRoutes = Router()

appRoutes.use('/users', userRoutes)

appRoutes.use('/bills', billRoutes)

export default appRoutes
