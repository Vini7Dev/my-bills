import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository'

interface IServiceProps {
  name: string
  username: string
  password: string
}

export class CreateUserService {
  private usersRepository = new UsersRepository()

  public async execute({
    name,
    username,
    password,
  }: IServiceProps): Promise<{ message: string }> {
    const userWithSameUsername = await this.usersRepository.findUserByUsername(username)

    if (userWithSameUsername) {
      throw new AppError('This username already exists!')
    }

    await this.usersRepository.create({
      name,
      username,
      password,
    })

    return { message: 'Successfully registered user!' }
  }
}
