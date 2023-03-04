import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'
import { removeObjectAttribute } from '../../utils/removeObjectAttribute'

interface IServiceProps {
  authenticatedUserId: number
  userId: string
}

export class GetProfileDataService {
  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    userId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const findedUser = await this.usersRepository.findUserById(userId)

    if (!findedUser) {
      throw new AppError('User not found!', 404)
    }

    if (authenticatedUserId !== findedUser.id) {
      throw new AppError('You have no permission to see this profile!', 403)
    }

    const userWithoutPassword = removeObjectAttribute({
      object: findedUser,
      attributeToRemove: 'password'
    })

    return API_RESPONSES.successRetrieve(DATABASE_MODELS.USER, userWithoutPassword)
  }
}
