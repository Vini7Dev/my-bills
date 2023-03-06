import { Request, Response } from 'express'

import { GetProfileBillsService } from '../services/users/GetProfileBillsService'

export class ProfileBillsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: authenticatedUserId } = request.user

    const {
      afterDate,
      beforeDate,
      currentPage,
      perPage,
    } = request.query as any

    const getProfileBillsService = new GetProfileBillsService()

    const userBills = await getProfileBillsService.execute({
      authenticatedUserId,
      afterDate,
      beforeDate,
      currentPage: currentPage && Number(currentPage),
      perPage: perPage && Number(perPage),
    })

    return response.json(userBills)
  }
}
