import { Request, Response } from 'express'

import { CreateUserService } from '../services/CreateUserService'

export class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({})
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      username,
      password,
    } = request.body

    const createUserService = new CreateUserService()

    const responseMessage = await createUserService.execute({
      name,
      username,
      password,
    })

    return response.json(responseMessage).status(201)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({})
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({})
  }
}
