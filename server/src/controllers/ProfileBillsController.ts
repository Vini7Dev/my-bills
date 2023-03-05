import { Request, Response } from 'express'

import { GetProfileBillsService } from '../services/users/GetProfileBillsService'

export class ProfileBillsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: authenticatedUserId } = request.user

    const getProfileBillsService = new GetProfileBillsService()

    const userBills = await getProfileBillsService.execute({
      authenticatedUserId,
    })

    return response.json(userBills)
  }
}
