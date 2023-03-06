import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  afterDate: string
  beforeDate: string
  currentPage?: number
  perPage?: number
}

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
      throw new AppError('You must provide "afterDate" and "beforeDate" inputs!')
    }

    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError('User not found!', 404)
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
