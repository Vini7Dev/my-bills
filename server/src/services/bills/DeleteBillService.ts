import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  billId: number
}

export class DeleteBillService {
  private billsRepository = new BillsRepository()

  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    billId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError('You must be authenticated!', 401)
    }

    const billToDelete = await this.billsRepository.findById(billId)

    if (!billToDelete) {
      throw new AppError('Bill not found!', 404)
    }

    if (userOwner.id !== billToDelete.user_id) {
      throw new AppError('You have no permission to delete this bill!', 403)
    }

    await this.billsRepository.delete(billToDelete.id)

    return API_RESPONSES.successDelete(DATABASE_MODELS.BILL)
  }
}
