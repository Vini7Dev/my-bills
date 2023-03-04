import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  userId: string
  name?: string
  username?: string
  password?: string
  currentPassword: string
}

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
    const userToUpdate = await this.usersRepository.findUserById(userId)

    if (!userToUpdate) {
      throw new AppError('User not found!', 404)
    }

    if (authenticatedUserId !== userToUpdate.id) {
      throw new AppError('You have no permission to update this profile!', 403)
    }

    const passwordMatch = await HashProvider.validateHash({
      noHash: currentPassword,
      hashed: userToUpdate.password,
    })

    if (!passwordMatch) {
      throw new AppError('Invalid current password!', 403)
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
