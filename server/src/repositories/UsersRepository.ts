import { connection } from '../database/connection'
import { ICreateUserDTO } from '../dtos/users/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/users/IUpdateUserDTO'
import { User } from '../models/User'
import { DATABASE_TABLES } from '../utils/constants'

export class UsersRepository {
  private usersTableConnection = connection.table(DATABASE_TABLES.USERS)

  public async findUserById(id: string): Promise<User> {
    const findedUser = await this.usersTableConnection
      .select('*')
      .where({ id })
      .first()

    return findedUser
  }

  public async findUserByUsername(username: string): Promise<User | undefined> {
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
  }: ICreateUserDTO): Promise<void> {
    await this.usersTableConnection.insert({
      name,
      username,
      password,
    })
  }

  public async update({
    id,
    name,
    username,
    password,
  }: IUpdateUserDTO): Promise<void> {
    await this.usersTableConnection
      .where({ id })
      .update({
        name,
        username,
        password,
        updated_at: new Date(),
      })
  }

  public async delete(id: string): Promise<void> {
    await this.usersTableConnection
      .where({ id })
      .delete()
  }
}