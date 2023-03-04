import { AppError } from '../../errors/AppError'
import { User } from '../../models/User'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  userId: string
}

export class GetProfileDataService {
  private usersRepository = new UsersRepository()

  public async execute({ userId }: IServiceProps): Promise<IApiResponseMessage> {
    const findedUser = await this.usersRepository.findUserById(userId)

    if (!findedUser) {
      throw new AppError('User not found!', 404)
    }

    return API_RESPONSES.successRetrieve(DATABASE_MODELS.USER, findedUser)
  }
}
