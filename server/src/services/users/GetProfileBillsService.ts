import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  afterDate: string
  beforeDate: string
  currentPage?: number
  perPage?: number
}

const MISSING_PARAMS_ERROR_MESSAGE = 'You must provide "afterDate" and "beforeDate" inputs!'
const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'

export class GetProfileBillsService {
  private usersRepository = new UsersRepository()

  private billsRepository = new BillsRepository()

  public async execute({
    authenticatedUserId,
    afterDate,
    beforeDate,
    currentPage,
    perPage,
  }: IServiceProps): Promise<IApiResponseMessage> {
    if (!afterDate || !beforeDate) {
      throw new AppError(MISSING_PARAMS_ERROR_MESSAGE)
    }

    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    const userBills = await this.billsRepository.findByUserId({
      user_id: userOwner.id,
      afterDate,
      beforeDate,
      currentPage,
      perPage,
    })

    return API_RESPONSES.successRetrieve(DATABASE_MODELS.BILL, userBills)
  }
}
