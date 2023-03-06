import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  userId: number
  name?: string
  username?: string
  password?: string
  currentPassword: string
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'
const WITHOUT_PERMISSION_TO_UPDATE_ERROR_MESSAGE = 'You have no permission to delete this bill!'
const INVALID_CURRENT_PASSWORD = 'Invalid current password!'

export class UpdateUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    userId,
    name,
    username,
    password,
    currentPassword,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userToUpdate = await this.usersRepository.findById(userId)

    if (!userToUpdate) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    if (authenticatedUserId !== userToUpdate.id) {
      throw new AppError(WITHOUT_PERMISSION_TO_UPDATE_ERROR_MESSAGE, EXCEPTION_CODES.FORBIDDEN)
    }

    const passwordMatch = await HashProvider.validateHash({
      noHash: currentPassword,
      hashed: userToUpdate.password,
    })

    if (!passwordMatch) {
      throw new AppError(INVALID_CURRENT_PASSWORD, EXCEPTION_CODES.UNAUTHORIZED)
    }

    const newPassword = password
      ? await HashProvider.createHash({ toHash: password })
      : userToUpdate.password

    const updatedUserContent = {
      id: userId,
      name: name ?? userToUpdate.name,
      username: username ?? userToUpdate.username,
      password: newPassword,
    }

    await this.usersRepository.update(updatedUserContent)

    return API_RESPONSES.successUpdate(DATABASE_MODELS.USER)
  }
}
