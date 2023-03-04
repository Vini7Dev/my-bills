import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  userId: string
}

export class DeleteUserService {
  private usersRepository = new UsersRepository()

  public async execute({ userId }: IServiceProps): Promise<IApiResponseMessage> {
    const userToDelete = await this.usersRepository.findUserById(userId)

    if (!userToDelete) {
      throw new AppError('User not found!', 404)
    }

    await this.usersRepository.delete(userId)

    return API_RESPONSES.successDelete(DATABASE_MODELS.USER)
  }
}
