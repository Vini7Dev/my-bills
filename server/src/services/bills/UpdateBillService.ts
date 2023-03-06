import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number,
  billId: number,
  description?: string,
  date?: string,
  value?: number,
  origin?: BillOrigins,
}

export class UpdateBillService {
  private billsRepository = new BillsRepository()

  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    billId,
    description,
    date,
    value,
    origin,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError('User not found!', 404)
    }

    const billToUpdate = await this.billsRepository.findById(billId)

    if (!billToUpdate) {
      throw new AppError('Bill not found!', 404)
    }

    if (userOwner.id !== billToUpdate.user_id) {
      throw new AppError('You have no permission to update this bill!', 403)
    }

    const updatedUserContent = {
      id: billId,
      description: description ?? billToUpdate.description,
      date: date ?? billToUpdate.date,
      value: value ?? billToUpdate.value,
      origin: origin ?? billToUpdate.origin,
    }

    await this.billsRepository.update(updatedUserContent)

    return API_RESPONSES.successUpdate(DATABASE_MODELS.BILL)
  }
}
