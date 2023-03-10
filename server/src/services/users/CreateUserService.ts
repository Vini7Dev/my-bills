import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  name: string
  username: string
  password: string
}

const USERNAME_ALREADY_EXISTS_ERROR_MESSAGE = 'This username already exists!'

export class CreateUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    name,
    username,
    password,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userWithSameUsername = await this.usersRepository.findByUsername(username)

    if (userWithSameUsername) {
      throw new AppError(USERNAME_ALREADY_EXISTS_ERROR_MESSAGE)
    }

    const passwordHash = await HashProvider.createHash({ toHash: password })

    await this.usersRepository.create({
      name,
      username,
      password: passwordHash,
    })

    return API_RESPONSES.successCreate(DATABASE_MODELS.USER)
  }
}
