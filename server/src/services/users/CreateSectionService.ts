import { sign } from 'jsonwebtoken'

import authConfig from '../../config/auth'
import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES } from '../../utils/constants'

interface IServiceProps {
  username: string
  password: string
}

export class CreateSectionService {
  private usersRepository = new UsersRepository()

  public async execute({
    username,
    password
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userData = await this.usersRepository.findByUsername(username)

    if (!userData) {
      throw new AppError('Invalid credentials!')
    }

    const passwordMatch = await HashProvider.validateHash({
      noHash: password,
      hashed: userData.password,
    })

    if (!passwordMatch) {
      throw new AppError('Invalid credentials!')
    }

    const { token: { secret, expiresIn } } = authConfig

    const token = sign({}, secret, {
      expiresIn: expiresIn,
      subject: String(userData.id),
    })

    return API_RESPONSES.successAuthToken(token)
  }
}
