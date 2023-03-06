export interface IGetByUserIdDTO {
  user_id: number
  afterDate: string
  beforeDate: string
  currentPage?: number
  perPage?: number
}
