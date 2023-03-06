import {
  JWT_SECRET,
  JWT_EXPIRES_IN
} from '../utils/constants'

export default {
  token: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  }
}
