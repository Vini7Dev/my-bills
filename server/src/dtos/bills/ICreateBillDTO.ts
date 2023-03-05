export interface ICreateBillDTO {
  user_id: number
  description: string
  date: string
  value: number
  origin: BillOrigins
}
