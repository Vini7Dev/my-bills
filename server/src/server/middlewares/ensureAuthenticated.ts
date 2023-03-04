import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../../errors/AppError'
import { JWT_SECRET } from '../../utils/constants'

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

  try {
      const { sub: userId } = verify(token, JWT_SECRET) as ITokenPayload

      request.user = {
        id: Number(userId),
      }

      next()
  } catch {
      throw new AppError('Invalid token!', 401)
  }
}
