export interface IProduct {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  description: string
  category: string
  freeShipping?: boolean
  installments?: {
    count: number
    value: number
    interestFree: boolean
  }
}
