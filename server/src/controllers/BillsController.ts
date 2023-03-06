import { Request, Response } from 'express'

import { CreateBillService } from '../services/bills/CreateBillService'
import { DeleteBillService } from '../services/bills/DeleteBillService'
import { UpdateBillService } from '../services/bills/UpdateBillService'

export class BillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: authenticatedUserId } = request.user

    const {
      description,
      date,
      value,
      origin,
    } = request.body

    const createBillService = new CreateBillService()

    const responseMessage = await createBillService.execute({
      authenticatedUserId,
      description,
      date,
      value,
      origin,
    })

    return response.json(responseMessage).status(201)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: authenticatedUserId } = request.user

    const { id: billId } = request.params

    const {
      description,
      date,
      value,
      origin,
    } = request.body

    const updateBillService = new UpdateBillService()

    const responseMessage = await updateBillService.execute({
      authenticatedUserId,
      billId: Number(billId),
      description,
      date,
      value: billId && Number(billId),
      origin,
    })

    return response.json(responseMessage).status(204)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: authenticatedUserId } = request.user

    const { id: billId } = request.params

    const deleteBillService = new DeleteBillService()

    const responseMessage = await deleteBillService.execute({
      authenticatedUserId,
      billId: Number(billId),
    })

    return response.json(responseMessage).status(204)
  }
}
