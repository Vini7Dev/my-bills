import { connection } from '../database/connection'
import { ICreateBillDTO } from '../dtos/bills/ICreateBillDTO'
import { Bill } from '../models/Bill'
import { DATABASE_MODELS } from '../utils/constants'

export class BillsRepository {
  private billsTableConnection = connection.table(DATABASE_MODELS.BILLS)

  public async getByUserId(user_id: number): Promise<Bill[]> {
    const userBills = await this.billsTableConnection
      .select('*')
      .where({ user_id })

    return userBills
  }

  public async create({
    user_id,
    description,
    date,
    value,
    origin,
  }: ICreateBillDTO): Promise<void> {
    await this.billsTableConnection.insert({
      user_id,
      description,
      date,
      value,
      origin,
    })
  }
}
