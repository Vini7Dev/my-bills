import { connection } from '../database/connection'
import { ICreateUserDTO } from '../dtos/users/ICreateUserDTO'
import { DATABASE_TABLES } from '../utils/constants'

export class UsersRepository {
  private usersTableConnection = connection.table(DATABASE_TABLES.USERS)

  public async findUserByUsername(username: string) {
    const findedUser = await this.usersTableConnection
      .select('*')
      .where({ username })
      .first()

    return findedUser
  }

  public async create({
    name,
    username,
    password,
  }: ICreateUserDTO) {
    await this.usersTableConnection.insert({
      name,
      username,
      password,
    })
  }
}
