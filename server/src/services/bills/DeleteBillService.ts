import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  billId: number
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'
const BILL_NOT_FOUND_ERROR_MESSAGE = 'Bill not found!'
const WITHOUT_PERMISSION_TO_DELETE_ERROR_MESSAGE = 'You have no permission to delete this bill!'

export class DeleteBillService {
  private billsRepository = new BillsRepository()

  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    billId,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    const billToDelete = await this.billsRepository.findById(billId)

    if (!billToDelete) {
      throw new AppError(BILL_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    if (userOwner.id !== billToDelete.user_id) {
      throw new AppError(WITHOUT_PERMISSION_TO_DELETE_ERROR_MESSAGE, EXCEPTION_CODES.FORBIDDEN)
    }

    await this.billsRepository.delete(billToDelete.id)

    return API_RESPONSES.successDelete(DATABASE_MODELS.BILL)
  }
}
