import { AppError } from '../../errors/AppError'
import { BillsRepository } from '../../repositories/BillsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { API_RESPONSES, DATABASE_MODELS, EXCEPTION_CODES } from '../../utils/constants'

interface IServiceProps {
  authenticatedUserId: number
  description: string
  date: string
  value: number
  origin: BillOrigins
}

const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found!'

export class CreateBillService {
  private billsRepository = new BillsRepository()

  private usersRepository = new UsersRepository()

  public async execute({
    authenticatedUserId,
    description,
    date,
    value,
    origin,
  }: IServiceProps): Promise<IApiResponseMessage> {
    const userOwner = await this.usersRepository.findById(authenticatedUserId)

    if (!userOwner) {
      throw new AppError(USER_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.NOT_FOUND)
    }

    await this.billsRepository.create({
      user_id: userOwner.id,
      description,
      date,
      value,
      origin,
    })

    return API_RESPONSES.successCreate(DATABASE_MODELS.BILL)
  }
}
