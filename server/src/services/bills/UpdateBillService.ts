import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number,
  billId: number,
  description?: string,
  date?: string,
  value?: number,
  origin?: BillOrigins,
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'
const BILL_NOT_FOUND_ERROR_MESSAGE = 'Bill not found!'
const WITHOUT_PERMISSION_TO_UPDATE_ERROR_MESSAGE = 'You have no permission to delete this bill!'

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
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    const billToUpdate = await this.billsRepository.findById(billId)

    if (!billToUpdate) {
      throw new AppError(BILL_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    if (userOwner.id !== billToUpdate.user_id) {
      throw new AppError(WITHOUT_PERMISSION_TO_UPDATE_ERROR_MESSAGE, EXCEPTION_CODES.FORBIDDEN)
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
