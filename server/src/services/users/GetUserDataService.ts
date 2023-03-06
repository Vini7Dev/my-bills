import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'
import { removeObjectAttribute } from '../../utils/removeObjectAttribute'

interface IServiceProps {
  authenticatedUserId: number
  userId: number
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'
const WITHOUT_PERMISSION_TO_RETRIEVE_ERROR_MESSAGE = 'You have no permission to delete this bill!'

export class GetUserDataService {
  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    userId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const findedUser = await this.usersRepository.findById(userId)

    if (!findedUser) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    if (authenticatedUserId !== findedUser.id) {
      throw new AppError(WITHOUT_PERMISSION_TO_RETRIEVE_ERROR_MESSAGE, EXCEPTION_CODES.FORBIDDEN)
    }

    const userWithoutPassword = removeObjectAttribute({
      object: findedUser,
      attributeToRemove: 'password'
    })

    return API_RESPONSES.successRetrieve(DATABASE_MODELS.USER, userWithoutPassword)
  }
}
