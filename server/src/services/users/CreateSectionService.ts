import { sign } from 'jsonwebtoken'

import authConfig from '../../config/auth'
import { AppError } from '../../errors/AppError'
import { HashProvider } from '../../providers/HashProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  username: string
  password: string
}

const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Invalid credentials!'

export class CreateSectionService {
  private usersRepository = new UsersRepository()

  public async execute({
    username,
    password
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userData = await this.usersRepository.findByUsername(username)

    if (!userData) {
      throw new AppError(INVALID_CREDENTIALS_ERROR_MESSAGE, EXCEPTION_CODES.UNAUTHORIZED)
    }

    const passwordMatch = await HashProvider.validateHash({
      noHash: password,
      hashed: userData.password,
    })

    if (!passwordMatch) {
      throw new AppError(INVALID_CREDENTIALS_ERROR_MESSAGE, EXCEPTION_CODES.UNAUTHORIZED)
    }

    const { token: { secret, expiresIn } } = authConfig

    const token = sign({}, secret, {
      expiresIn: expiresIn,
      subject: String(userData.id),
    })

    return API_RESPONSES.successAuthToken(token)
  }
}
