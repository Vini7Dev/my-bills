import { compare, hash } from 'bcrypt'

import { HASH_SALT } from '../../utils/constants'

interface ICreateHashProps {
  toHash: string
}

interface IValidateHashProps {
  noHash: string
  hashed: string
}

export class HashProvider {
  public static async createHash({ toHash }: ICreateHashProps): Promise<string> {
    return hash(toHash, HASH_SALT)
  }

  public static async validateHash({ noHash, hashed }: IValidateHashProps): Promise<boolean> {
    return compare(noHash, hashed)
  }
}
