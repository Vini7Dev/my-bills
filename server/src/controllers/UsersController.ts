import { Request, Response } from 'express'

import { CreateUserService } from '../services/users/CreateUserService'
import { DeleteUserService } from '../services/users/DeleteUserService'
import { GetProfileDataService } from '../services/users/GetProfileDataService'
import { UpdateUserService } from '../services/users/UpdateUserService'

export class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params

    const getProfileDataService = new GetProfileDataService()

    const findedUser = await getProfileDataService.execute({
      userId,
    })

    return response.json(findedUser).status(200)
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
    const { id: userId } = request.params

    const {
      name,
      username,
      password,
      currentPassword,
    } = request.body

    const updateUserService = new UpdateUserService()

    const responseMessage = await updateUserService.execute({
      userId,
      name,
      username,
      password,
      currentPassword,
    })

    return response.json(responseMessage).status(204)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params

    const deleteUserService = new DeleteUserService()

    const responseMessage = await deleteUserService.execute({
      userId,
    })

    return response.json(responseMessage).status(204)
  }
}
