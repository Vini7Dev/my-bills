export interface IUpdateBillDTO {
  id: number
  description?: string
  date?: string
  value?: number
  origin?: BillOrigins
}
