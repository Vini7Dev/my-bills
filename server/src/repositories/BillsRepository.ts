import { connection } from '../database/connection'
import { ICreateBillDTO } from '../dtos/bills/ICreateBillDTO'
import { DATABASE_MODELS } from '../utils/constants'

export class BillsRepository {
  private billsTableConnection = connection.table(DATABASE_MODELS.BILLS)

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
