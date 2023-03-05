import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  userId: number
}

export class DeleteUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    userId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userToDelete = await this.usersRepository.findUserById(userId)

    if (!userToDelete) {
      throw new AppError('User not found!', 404)
    }

    if (authenticatedUserId !== userToDelete.id) {
      throw new AppError('You have no permission to delete this profile!', 403)
    }

    await this.usersRepository.delete(userId)

    return API_RESPONSES.successDelete(DATABASE_MODELS.USER)
  }
}
