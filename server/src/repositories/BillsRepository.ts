import { connection } from '../database/connection'
import { ICreateBillDTO } from '../dtos/bills/ICreateBillDTO'
import { IGetByUserIdDTO } from '../dtos/bills/IGetByUserIdDTO'
import { Bill } from '../models/Bill'
import { DATABASE_MODELS } from '../utils/constants'

export class BillsRepository {
  private billsTableConnection = connection.table(DATABASE_MODELS.BILLS)

  public async findById(id: number): Promise<Bill | undefined> {
    const findedBill = await this.billsTableConnection
      .select('*')
      .where({ id })
      .first()

    return findedBill
  }

  public async findByUserId({
    user_id,
    afterDate,
    beforeDate,
    currentPage = 0,
    perPage = 100,
  }: IGetByUserIdDTO): Promise<Bill[]> {
    const userBills = await this.billsTableConnection
      .select('*')
      .where({ user_id })
      .whereBetween('date', [new Date(afterDate), new Date(beforeDate)])
      .paginate({ currentPage, perPage })

    return userBills.data as Bill[]
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

  public async delete(id: number): Promise<void> {
    await this.billsTableConnection
      .where({ id })
      .delete()
  }
}
