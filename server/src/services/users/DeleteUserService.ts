import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  userId: number
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'
const WITHOUT_PERMISSION_TO_DELETE_ERROR_MESSAGE = 'You have no permission to delete this bill!'

export class DeleteUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    userId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userToDelete = await this.usersRepository.findById(userId)

    if (!userToDelete) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    if (authenticatedUserId !== userToDelete.id) {
      throw new AppError(WITHOUT_PERMISSION_TO_DELETE_ERROR_MESSAGE, EXCEPTION_CODES.FORBIDDEN)
    }

    await this.usersRepository.delete(userId)

    return API_RESPONSES.successDelete(DATABASE_MODELS.USER)
  }
}
