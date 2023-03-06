import crypto from 'crypto'
import multer from 'multer'

import { MULTER_TEMP_FILE } from '../utils/constants'

export default {
    tmpFolder: MULTER_TEMP_FILE,
    storage: multer.diskStorage({
        destination: MULTER_TEMP_FILE,
        filename: (_, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        },
    }),
}
