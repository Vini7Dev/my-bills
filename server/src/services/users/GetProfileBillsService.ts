import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
}

export class GetProfileBillsService {
  private usersRepository = new UsersRepository()

  private billsRepository = new BillsRepository()

  public async execute({
    authenticatedUserId
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userOwner = await this.usersRepository.findUserById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError('User not found!', 404)
    }

    const userBills = await this.billsRepository.getByUserId(userOwner.id)

    return API_RESPONSES.successRetrieve(DATABASE_MODELS.BILL, userBills)
  }
}
