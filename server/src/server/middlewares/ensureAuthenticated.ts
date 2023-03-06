import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../../config/auth'
import { AppError } from '../../errors/AppError'

interface ITokenPayload {
  sub: string
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    throw new AppError('Token not found!', 401)
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
      throw new AppError('Invalid token!', 401)
  }
}
