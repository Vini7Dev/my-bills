declare interface IApiResponseMessage {
  message: string
  data?: any
}

declare type BillOrigins = 'bradesco' | 'nubank' | 'manually'
