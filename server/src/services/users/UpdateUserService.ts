import { AppError } from '../../errors/AppError'
import { UsersRepository } from '../../repositories/UsersRepository'

interface IServiceProps {
  userId: string
  name?: string
  username?: string
  password?: string
  currentPassword: string
}

export class UpdateUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    userId,
    name,
    username,
    password,
    currentPassword,
  }: IServiceProps): Promise<{ message: string }> {
    const userToDelete = await this.usersRepository.findUserById(userId)

    if (!userToDelete) {
      throw new AppError('User not found!', 404)
    }

    if (userToDelete.password !== currentPassword) {
      throw new AppError('Invalid current password!', 403)
    }

    const updatedUserContent = {
      id: userId,
      name: name ?? userToDelete.name,
      username: username ?? userToDelete.username,
      password: password ?? userToDelete.password,
    }

    await this.usersRepository.update(updatedUserContent)

    return { message: 'User updated successfully!' }
  }
}
