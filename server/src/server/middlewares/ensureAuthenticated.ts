import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../../config/auth'
import { AppError } from '../../errors/AppError'
import { EXCEPTION_CODES } from '../../utils/constants'

interface ITokenPayload {
  sub: string
}

const TOKEN_NOT_FOUND_ERROR_MESSAGE = 'Token not found!'
const INVALID_TOKEN_ERROR_MESSAGE = 'Invalid token!'

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    throw new AppError(TOKEN_NOT_FOUND_ERROR_MESSAGE, EXCEPTION_CODES.UNAUTHORIZED)
  }

  const [, token] = bearerToken.split(' ')

  const { token: { secret } } = authConfig

  try {
      const { sub: userId } = verify(token, secret) as ITokenPayload

      request.user = {
        id: Number(userId),
      }

      next()
  } catch {
      throw new AppError(INVALID_TOKEN_ERROR_MESSAGE, EXCEPTION_CODES.UNAUTHORIZED)
  }
}
