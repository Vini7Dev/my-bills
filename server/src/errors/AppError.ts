import { EXCEPTION_CODES } from '../utils/constants'

export class AppError {
  public readonly message: string

  public readonly code: number

  constructor (message: string, code = EXCEPTION_CODES.DEFAULT) {
    this.message = message
    this.code = code
  }
}
