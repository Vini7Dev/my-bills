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

    console.log('===> userWithSameUsername', userWithSameUsername)

    if (userWithSameUsername) {
      throw new Error('This username already exists!')
    }

    await this.usersRepository.create({
      name,
      username,
      password,
    })

    return { message: 'Successfully registered user!' }
  }
}
