import { sign } from 'jsonwebtoken'

import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, JWT_EXPIRES_IN, JWT_SECRET } from '../../utils/constants'

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
    const userData = await this.usersRepository.findUserByUsername(username)

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

    const token = sign({}, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      subject: String(userData.id),
    })

    return API_RESPONSES.successAuthToken(token)
  }
}
