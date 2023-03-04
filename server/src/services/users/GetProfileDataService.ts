import { AppError } from '../../errors/AppError'
import { User } from '../../models/User'
import { UsersRepository } from '../../repositories/UsersRepository'

interface IServiceProps {
  userId: string
}

export class GetProfileDataService {
  private usersRepository = new UsersRepository()

  public async execute({ userId }: IServiceProps): Promise<User> {
    const findedUser = await this.usersRepository.findUserById(userId)

    if (!findedUser) {
      throw new AppError('User not found!', 404)
    }

    return findedUser
  }
}
