import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'

interface IServiceProps {
  userId: string
}

export class DeleteUserService {
  private usersRepository = new UsersRepository()

  public async execute({ userId }: IServiceProps): Promise<{ message: string }> {
    const userToDelete = await this.usersRepository.findUserById(userId)

    if (!userToDelete) {
      throw new AppError('User not found!', 404)
    }

    await this.usersRepository.delete(userId)

    return { message: 'User deleted successfully!' }
  }
}
