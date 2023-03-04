import { Request, Response } from 'express'

import { CreateSectionService } from '../services/users/CreateSectionService'

export class SectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      username,
      password,
    } = request.body

    const createSectionService = new CreateSectionService()

    const responseMessage = await createSectionService.execute({
      username,
      password,
    })

    return response.json(responseMessage).status(201)
  }
}
